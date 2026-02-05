import { it, describe, expect } from 'vitest'
import { getShopName, hasMultipleShopsForCountry } from './shop'

describe('getShopName', () => {
  it('should return the localized country name', () => {
    expect(getShopName('en-DE')).toBe('Germany')
    expect(getShopName('de-DE')).toBe('Deutschland')
    expect(getShopName('en-US')).toBe('United States')
    expect(getShopName('es-US')).toBe('Estados Unidos')
  })

  it('should include the language code when includeLanguage = true', () => {
    expect(getShopName('en-DE', true)).toBe('Germany | EN')
    expect(getShopName('de-DE', true)).toBe('Deutschland | DE')
    expect(getShopName('en-US', true)).toBe('United States | EN')
    expect(getShopName('es-US', true)).toBe('Estados Unidos | ES')
  })
})

describe('hasMultipleShopsForCountry', () => {
  it('should return true when multiple shops have the same country', () => {
    expect(
      hasMultipleShopsForCountry([
        { locale: 'en-DE' },
        { locale: 'de-DE' },
        { locale: 'en-GB' },
      ]),
    ).toBe(true)
  })

  it('should return false when there are no shops', () => {
    expect(hasMultipleShopsForCountry([])).toBe(false)
  })

  it('should return false when all shops have a unique country', () => {
    expect(
      hasMultipleShopsForCountry([
        { locale: 'en-DE' },
        { locale: 'en-US' },
        { locale: 'en-GB' },
      ]),
    ).toBe(false)
  })
})
