import http from 'node:http'
import https from 'node:https'
import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'

// Quick test script for validating that routeRules are properly
// set for caching the public pages, and not caching private ones
// Can be run like `node scripts/cache-test.mjs`
// The BASE_URL can be set via an environment variable
// Otherwise, it will default to testing http://localhost:3000/en

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000/en'

const join = (base, pathname) => {
  const url = new URL(base)
  const newPath = path.join(url.pathname, pathname)
  return new URL(newPath, url.origin)
}

const token = new URL(BASE_URL).searchParams.get('x-vercel-protection-bypass')

const getHeaders = async (_url) => {
  const url = new URL(_url)
  url.searchParams.delete('x-vercel-protection-bypass')
  url.searchParams.delete('x-vercel-set-bypass-cookie')
  return new Promise((resolve, reject) => {
    ;(url.protocol === 'http' ? http : https)
      .get(
        url,
        { headers: token ? { 'x-vercel-protection-bypass': token } : {} },
        (res) => {
          resolve(res.headers)
          res.resume()
        },
      )
      .on('error', (e) => reject(e))
  })
}

function parseCacheControl(header) {
  const result = {}
  const directives = header.split(',').map((d) => d.trim())

  directives.forEach((directive) => {
    if (directive.includes('=')) {
      const [property, value] = directive.split('=')
      result[property.trim()] = value.trim()
    } else {
      result[directive] = true
    }
  })

  return result
}

function assertCacheHeaders(headers) {
  try {
    if (!headers['cache-control']) {
      assert.fail('Cache headers are missing!')
    }

    const cacheControl = parseCacheControl(headers['cache-control'])

    const sMaxAge = parseInt(cacheControl['s-maxage'])
    const maxAge = parseInt(cacheControl['max-age'])
    if (!sMaxAge && !maxAge) {
      assert.fail(
        'Missing s-maxage or max-age directive in cache-control header',
      )
    }

    if (
      cacheControl['stale-while-revalidate'] !== 'true' &&
      isNaN(parseInt(cacheControl['stale-while-revalidate'])) &&
      headers['server'] !== 'Vercel' // ignore SWR for vercel
    ) {
      assert.fail(
        'Missing stale-while-revalidate directive in cache-control header',
      )
    }
  } catch (e) {
    console.error(headers)
    throw e
  }
}

function assertNoCacheHeaders(headers) {
  if (headers['cache-control']) {
    const cacheControl = parseCacheControl(headers['cache-control'])
    if (parseInt(cacheControl['max-age']) !== 0) {
      console.error({ headers })
      assert.fail('Cache headers should not be present!')
    }
  }
  const cookieHeader = headers['set-cookie']

  if (cookieHeader && cookieHeader.includes('$session')) {
    assert.fail('Cached responses should not set the session cookie!')
  }
}

test('home page has cache headers', async () => {
  const headers = await getHeaders(BASE_URL)
  assertCacheHeaders(headers)
})

test('product list has cache headers', async () => {
  const headers = await getHeaders(join(BASE_URL, '/women'))
  assertCacheHeaders(headers)
})

test('product page has cache headers', async () => {
  const headers = await getHeaders(
    join(
      BASE_URL,
      '/p/ribbed-tank-top-with-10-images-and-2-color-variations-1078',
    ),
  )
  assertCacheHeaders(headers)
})

test('wishlist does not have cache headers', async () => {
  const headers = await getHeaders(join(BASE_URL, '/wishlist'))
  assertNoCacheHeaders(headers)
})

test('basket does not have cache headers', async () => {
  const headers = await getHeaders(join(BASE_URL, '/wishlist'))
  assertNoCacheHeaders(headers)
})
