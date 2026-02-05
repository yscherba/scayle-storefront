import { it, describe } from 'vitest'
import { getCategoryId, normalizePathRoute, hasLocalePrefix } from './route'

describe('getCategoryId', () => {
  it('returns category ID from route params', ({ expect }) => {
    const id = getCategoryId({ categories: ['women'], id: '2' })
    expect(id).toEqual(2)
  })

  it('returns "NaN" if "id" in route params', ({ expect }) => {
    const id = getCategoryId({ categories: ['women'] })
    expect(id).toEqual(NaN)
  })
})

describe('normalizeRoutePath', () => {
  it('returns normalized route path', ({ expect }) => {
    const path = normalizePathRoute('women/clothing-2')
    expect(path).toEqual('/women/clothing-2')
  })

  it('returns same path if already normalized', ({ expect }) => {
    const path = normalizePathRoute('/women/clothing-2')
    expect(path).toEqual('/women/clothing-2')
  })
})

describe('hasLocalePrefix', () => {
  it('returns "true" if locale prefix is provided', ({ expect }) => {
    expect(hasLocalePrefix('de/women/clothing-2', 'de')).toEqual(true)
  })

  it('returns "false" if there is not locale prefix', ({ expect }) => {
    expect(hasLocalePrefix('/women/clothing-2')).toEqual(false)
  })
})
