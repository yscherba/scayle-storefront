import { extendPromise, type Promotion } from '@scayle/storefront-nuxt'
import { computed, type ComputedRef } from 'vue'
import { useBasket, useCurrentPromotions } from '#storefront/composables'
import { getPromotionIdFromProductAttributes } from '~/utils'

type UseActiveProgressPromotionsReturn = {
  /** A list of MOV promotions which have at least one promoted product in the basket. */
  promotions: ComputedRef<Promotion[]>
}
/**
 * A composable that retrieve a list of active MOV or tiered promotions.
 *
 * An active promotion is a current promotion which applies to an item in the current basket.
 *
 * @returns A promise resolving to an object containing the list of promotions.
 */
export function useActiveProgressPromotions(): UseActiveProgressPromotionsReturn &
  Promise<UseActiveProgressPromotionsReturn> {
  const basket = useBasket()
  const promotionData = useCurrentPromotions()

  const { items: basketItems } = basket

  const allCurrentPromotions = computed<Promotion[]>(() => {
    return promotionData.data?.value?.entities ?? []
  })

  const promotions = computed(() => {
    if (!allCurrentPromotions.value.length) {
      return []
    }

    return allCurrentPromotions.value.filter((promotion) => {
      const hasPromotedBasketItem = (basketItems.value ?? []).some(
        ({ product, status }) => {
          if (status !== 'available') {
            return false
          }
          const productPromotionId =
            getPromotionIdFromProductAttributes(product)

          if (
            !productPromotionId ||
            !promotion.customData.product?.attributeId
          ) {
            return false
          }

          return productPromotionId === promotion.customData.product.attributeId
        },
      )

      return (
        (promotion.tiers?.length ||
          !!promotion?.customData?.minimumOrderValue) &&
        hasPromotedBasketItem
      )
    })
  })

  return extendPromise(
    Promise.all([basket, promotionData]).then(() => ({})),
    {
      promotions,
    },
  )
}
