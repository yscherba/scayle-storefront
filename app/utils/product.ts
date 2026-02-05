import {
  type Promotion,
  type Price,
  type Product,
  getAttributeValueTuples,
  getFirstAttributeValue,
  type ProductImage,
  type Value,
} from '@scayle/storefront-nuxt'
import type { BasketItemPrice } from '@scayle/storefront-nuxt/composables'
import { getPrimaryImage } from './image'
import type { ProductSibling } from '~~/types/siblings'
import { sortPromotionsByPriority } from '#storefront-promotions/utils'

export { ProductImageType } from '@scayle/storefront-nuxt'

export const getPromotionIdFromProductAttributes = (product?: Product) => {
  if (!product) {
    return
  }
  return getFirstAttributeValue(product.attributes, 'promotion')?.id
}

/**
 * Retrieves the highest-priority promotion applicable to a given product.
 *
 * @param {Product} product - The product for which to find a promotion.
 * @param {Promotion[]} promotions - A list of available promotions.
 * @returns {Promotion | undefined} - The highest-priority promotion for the product, or undefined if none match.
 */
export const getPromotionForProduct = (
  product: Product,
  promotions: Promotion[],
): Promotion | undefined => {
  const productPromotionId = getPromotionIdFromProductAttributes(product)
  const items = promotions.filter(({ customData }) => {
    if (!productPromotionId || !customData.product?.attributeId) {
      return false
    }
    return customData.product?.attributeId === productPromotionId
  })

  return items.toSorted(sortPromotionsByPriority)[0]
}

export const getProductSiblingData = (
  { id, images, attributes, isSoldOut }: Product,
  colorAttributeName = 'colorDetail',
): ProductSibling => ({
  id,
  name: getFirstAttributeValue(attributes, 'name')?.label ?? '',
  brand: getFirstAttributeValue(attributes, 'brand')?.label ?? '',
  image: getPrimaryImage(images) ?? images[0],
  colors: getAttributeValueTuples(attributes, colorAttributeName),
  isSoldOut,
})

export const getProductSiblings = (
  product?: Product | null,
  colorAttributeName = 'colorDetail',
  options: {
    omitSoldOut?: boolean
    includeCurrentProduct?: boolean
    sortBySoldOut?: boolean
  } = {},
): ProductSibling[] => {
  if (!product) {
    return []
  }

  const {
    omitSoldOut = false,
    includeCurrentProduct = true,
    sortBySoldOut = false,
  } = options
  const siblingItems =
    product?.siblings?.filter(({ isActive }) => {
      return omitSoldOut ? isActive : true
    }) ?? []

  const items = siblingItems.map((item) =>
    getProductSiblingData(item, colorAttributeName),
  )

  if (sortBySoldOut) {
    items.sort((a, b) => {
      const soldOutOrder = a.isSoldOut ? 1 : -1

      return a.isSoldOut === b.isSoldOut ? 0 : soldOutOrder
    })
  }

  return includeCurrentProduct
    ? [getProductSiblingData(product, colorAttributeName), ...items]
    : items
}

/**
 * Creates a new price object by merging the original price with any overwrite properties.
 *
 * @param price - The original price object.
 * @param overwrite - Optional overwrite properties for the price object.
 * @returns A new price object with merged properties.
 */
export const createCustomPrice = <T = Price | BasketItemPrice>(
  price: T,
  overwrite: Partial<T>,
): T => {
  return {
    ...price,
    ...overwrite,
  }
}
/**
 * Returns the maximum allowed quantity for a variant, taking into account stock and an upper limit of 10.
 *
 * @param variant - The variant to get the max quantity for
 * @returns The maximum allowed quantity
 */
// Note: The basket does not allow a quantity > 50, therefore we limit it to prevent errors
export const getMaxQuantity = (stockQuantity?: number) =>
  Math.max(Math.min(stockQuantity ?? 1, 10), 0)

/**
 * Returns a list of distinct primary image types from a list of products.
 *
 * @param products - The list of products to get the distinct primary image types from.
 * @returns A list of distinct primary image types.
 */
export const getDistinctPrimaryImageTypes = (products: Product[]) => {
  return Array.from(
    products
      .flatMap((product: Product) => {
        return product.images.filter((img: ProductImage) => {
          return !!img.attributes?.primaryImageType
        })
      })
      .reduce<Map<number, Value>>((acc, img) => {
        const value = getFirstAttributeValue(img.attributes, 'primaryImageType')
        if (value && value.id) {
          acc.set(value.id, value)
        }
        return acc
      }, new Map<number, Value>())
      .values(),
  )
}

/**
 * Checks if a price has a campaign reduction.
 *
 * @param price - The price to check.
 * @returns True if the price has a campaign reduction, false otherwise.
 */
export const hasCampaignReduction = (price?: Price) => {
  return price?.appliedReductions.find(
    (reduction) => reduction.category === 'campaign',
  )
}
