import type { CentAmount, Price, Promotion } from '@scayle/storefront-nuxt'
import { it, describe, expect } from 'vitest'
import {
  attributeGroupSingleFactory,
  attributeGroupMultiFactory,
  productFactory,
  automaticDiscountPromotionFactory,
} from '@scayle/storefront-nuxt/test/factories'
import {
  getProductSiblings,
  getProductSiblingData,
  getPromotionForProduct,
  createCustomPrice,
  getMaxQuantity,
} from './product'

// TODO: Cover more cases (e.g return data set check, different color attribute name etc.)
describe('getPromotionForProduct', () => {
  it('should get the applicable promotion for the product with single promotion', () => {
    const product = productFactory.build({
      attributes: {
        promotion: attributeGroupSingleFactory.build({
          key: 'promotion',
          values: {
            id: 2432,
            label: '20% on Everything',
            value: '20_on_everything',
          },
        }),
      },
    })
    const promotions = [
      automaticDiscountPromotionFactory.build({
        customData: {
          product: {
            badgeLabel: '-20% Off',
            attributeId: 2432,
          },
        },
      }),
      automaticDiscountPromotionFactory.build({
        customData: {
          product: {
            badgeLabel: '-20% Off',
            attributeId: 9999,
          },
        },
      }),
    ] as Promotion[]
    const result = getPromotionForProduct(product, promotions)

    expect(result).toEqual(promotions[0])
  })

  it('should return undefined for no promotions', () => {
    const product = productFactory.build({
      attributes: {
        promotion: attributeGroupSingleFactory.build({
          key: 'promotion',
          values: {
            id: 2432,
            label: '20% on Everything',
            value: '20_on_everything',
          },
        }),
      },
    })

    const result = getPromotionForProduct(product, [])

    expect(result).toBeUndefined()
  })

  it('should get the applicable priority sorted promotion for the product with multiple promotions', () => {
    const product = productFactory.build({
      attributes: {
        promotion: attributeGroupMultiFactory.build({
          key: 'promotion',
          values: [
            {
              id: 2477,
              value: 'free_caps',
              label: 'Free Caps',
            },
            {
              id: 2432,
              label: '20% on Everything',
              value: '20_on_everything',
            },
          ],
        }),
      },
    })
    const promotions = [
      automaticDiscountPromotionFactory.build({
        id: '1',
        customData: {
          product: {
            badgeLabel: '-20% Off',
            attributeId: 2432,
          },
        },
        priority: 1,
      }),
      automaticDiscountPromotionFactory.build({
        id: '2',
        customData: {
          product: {
            badgeLabel: 'Free Caps',
            attributeId: 2477,
          },
        },
        priority: 9,
      }),
    ] as Promotion[]

    const result = getPromotionForProduct(product, promotions)

    expect(result).toEqual(promotions[1])
  })
})

describe('getProductSiblings', () => {
  it('returns active, sold out and with current product included siblings by default', ({
    expect,
  }) => {
    const product = productFactory.build({
      id: 1,
      siblings: [
        productFactory.build({ id: 2, isActive: true, isSoldOut: false }),
        productFactory.build({ id: 3, isActive: false, isSoldOut: true }),
      ],
    })
    const siblings = getProductSiblings(product, 'color')
    expect(siblings.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('returns product siblings without current product', ({ expect }) => {
    const product = productFactory.build({
      id: 1,
      siblings: [
        productFactory.build({ id: 2, isActive: true, isSoldOut: false }),
        productFactory.build({ id: 3, isActive: false, isSoldOut: true }),
      ],
    })
    const siblings = getProductSiblings(product, 'color', {
      includeCurrentProduct: false,
    })
    expect(siblings.map((item) => item.id)).toEqual([2, 3])
  })

  it('omits sold out siblings', ({ expect }) => {
    const product = productFactory.build({
      id: 1,
      siblings: [
        productFactory.build({ id: 2, isActive: true, isSoldOut: false }),
        productFactory.build({ id: 3, isActive: false, isSoldOut: true }),
      ],
    })
    const siblings = getProductSiblings(product, 'color', { omitSoldOut: true })
    expect(siblings.map((item) => item.id)).toEqual([1, 2])
  })

  it('sold out siblings are sorted to the end', ({ expect }) => {
    const product = productFactory.build({
      id: 1,
      siblings: [
        productFactory.build({ id: 2, isActive: false, isSoldOut: true }),
        productFactory.build({ id: 3, isActive: true, isSoldOut: false }),
      ],
    })
    const siblings = getProductSiblings(product, 'color', {
      sortBySoldOut: true,
    })
    expect(siblings.map((item) => item.id)).toEqual([1, 3, 2])
  })
})

describe('getProductSiblingData', () => {
  it('should return product sibling data', ({ expect }) => {
    const product = productFactory.build({
      id: 1,
      images: [
        {
          hash: 'images/fe8ee645c772b98de23b00e4f600a613.png',
          attributes: {},
        },
      ],
      isActive: true,
      isSoldOut: false,
      attributes: {
        name: attributeGroupSingleFactory.build({
          values: {
            label: "HUGO Sweatshirt 'Dakimara'",
          },
        }),
        brand: attributeGroupSingleFactory.build({
          values: {
            label: 'HUGO',
          },
        }),
        color: attributeGroupSingleFactory.build({
          values: {
            id: 6,
            label: 'Weiß',
            value: 'weiss',
          },
        }),
      },
    })
    const sibling = getProductSiblingData(product, 'color')
    expect(sibling).toStrictEqual({
      id: 1,
      name: "HUGO Sweatshirt 'Dakimara'",
      brand: 'HUGO',
      image: {
        hash: 'images/fe8ee645c772b98de23b00e4f600a613.png',
        attributes: {},
      },
      colors: [
        {
          id: 6,
          label: 'Weiß',
          value: 'weiss',
        },
      ],
      isSoldOut: false,
    })
  })
})

describe('createCustomPrice', () => {
  it('should replace product prices attribute with given value', () => {
    const price: Price = {
      currencyCode: 'EUR',
      withTax: 8990 as CentAmount,
      withoutTax: 7555 as CentAmount,
      appliedReductions: [],
      tax: {
        vat: {
          amount: 1435 as CentAmount,
          rate: 0.19,
        },
      },
    }

    const customPrice = createCustomPrice(price, { withTax: 0 as CentAmount })

    expect(customPrice).toStrictEqual({
      currencyCode: 'EUR',
      withTax: 0 as CentAmount,
      withoutTax: 7555 as CentAmount,
      appliedReductions: [],
      tax: {
        vat: {
          amount: 1435 as CentAmount,
          rate: 0.19,
        },
      },
    })
  })
})

describe('getMaxQuantity', () => {
  it('should limit the quantity to 10', () => {
    const maxQuantity = getMaxQuantity(100)
    expect(maxQuantity).toBe(10)
  })
  it('should limit the quantity to the available stock', () => {
    const maxQuantity = getMaxQuantity(9)
    expect(maxQuantity).toBe(9)
  })
  it('should default to 1 when no stock is present', () => {
    const maxQuantity = getMaxQuantity(undefined)
    expect(maxQuantity).toBe(1)
  })
})
