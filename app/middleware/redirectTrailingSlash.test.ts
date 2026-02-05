import { describe, expect, it } from 'vitest'
import { normalizeURLPath } from './redirectTrailingSlash.global'

describe('normalizeURLPath', () => {
  it('should remove trailing slashes from a URL path', () => {
    expect(normalizeURLPath('/en/c/some-category-12345///')).toBe(
      '/en/c/some-category-12345',
    )
  })

  it('should return a single slash for a path with only slashes', () => {
    expect(normalizeURLPath('///')).toBe('/')
  })

  it('should not modify a path without trailing slashes', () => {
    expect(normalizeURLPath('/en/c/some-category-12345')).toBe(
      '/en/c/some-category-12345',
    )
  })

  it('should handle an empty path', () => {
    expect(normalizeURLPath('')).toBe('/')
  })
})

const normalizeURLPathWithRegEx = (path: string) =>
  path.replace(/\/+$/, '') || '/'

describe.skip('Performance Comparison: normalizeURLPath', () => {
  const testURLPath = '/en/c/some-category-12345//'
  const iterations = 100000 // Adjust as needed

  it('should be faster to use Slice than RegEx for url path normalization', () => {
    let startTime, endTime

    startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
      normalizeURLPathWithRegEx(testURLPath)
    }

    endTime = performance.now()
    const regexTime = endTime - startTime

    startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
      normalizeURLPath(testURLPath)
    }

    endTime = performance.now()
    const sliceTime = endTime - startTime

    console.log(`RegEx time: ${regexTime} ms`)
    console.log(`Slice time: ${sliceTime} ms`)

    expect(sliceTime).toBeLessThan(regexTime)
  })
})
