<template>
  <div
    v-if="isTieredDiscount && (progress || text)"
    class="flex flex-col px-6 pt-4 text-md text-secondary"
  >
    <SFProgressBar
      v-if="progress !== undefined"
      class="mb-2"
      :progress="progress * 100"
      :color="colorStyle.backgroundColor"
      :milestones="milestones"
    />
    <div v-if="text" class="mb-4">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Promotion, PromotionEffect } from '@scayle/storefront-nuxt'
import { computed } from 'vue'
import { useI18n } from '#imports'
import SFProgressBar from '~/components/promotion/SFProgressBar.vue'
import { usePromotionTierProgress } from '#storefront-promotions/composables'
import { usePromotionCustomData } from '~/composables'
import { isBuyXGetYType } from '#storefront-promotions/utils'
import { useFormatHelpers, useBasket } from '#storefront/composables'
import { getTieredPromotion } from '~/utils'

const { promotion } = defineProps<{ promotion: Promotion }>()

const { t } = useI18n()

const isTieredDiscount = computed(() => {
  return !!getTieredPromotion(promotion).tiers.length
})

const { progress, discount, tiers, isPromotionApplied, remaining, complete } =
  usePromotionTierProgress(getTieredPromotion(promotion))

const { items: basketItems } = useBasket()

const isGiftAddedToBasket = computed(() => {
  if (!isBuyXGetYType(promotion)) {
    return false
  }
  return (
    basketItems.value?.some(({ promotion: basketPromotion, variant }) => {
      const variantIds = isBuyXGetYType(promotion)
        ? promotion.effect.additionalData.variantIds ?? []
        : []
      const hasVariantId = variantIds.includes(variant.id)
      return (
        isBuyXGetYType(basketPromotion) &&
        hasVariantId &&
        promotion.id === basketPromotion?.id
      )
    }) || false
  )
})

const { colorStyle } = usePromotionCustomData(promotion)

const { formatCurrency, formatPercentage } = useFormatHelpers()

const formatEffect = (effect: PromotionEffect): string => {
  if (effect.type === 'automatic_discount') {
    if (effect.additionalData.type === 'relative') {
      return formatPercentage(
        Math.round(effect.additionalData.value * -1) / 100,
      )
    } else {
      return formatCurrency(Math.round(effect.additionalData.value), {
        currencyFractionDigits: 0,
      })
    }
  } else {
    return t('promotion_progress_wrapper.free_gift')
  }
}

const milestones = computed(() =>
  tiers.value.map((tier) => ({
    percent: tier.percent,
    title: formatCurrency(tier.mov, { currencyFractionDigits: 0 }),
    subtitle: formatEffect(tier.effect),
  })),
)

const text = computed(() => {
  const hasReachedFirstTier = tiers.value.some((tier) => tier.progress >= 1)

  if (!hasReachedFirstTier) {
    return t('promotion_progress_wrapper.remaining_minimum_order_value', {
      amount: formatCurrency(remaining.value),
    })
  } else {
    if (!isPromotionApplied.value) {
      return t('promotion_progress_wrapper.fulfilled_promotion_condition')
    }

    if (isBuyXGetYType(promotion) && isGiftAddedToBasket.value) {
      return t('promotion_progress_wrapper.free_gift_unlocked')
    }

    // Last tier savings messaging
    if (complete.value) {
      return t('promotion_progress_wrapper.full_savings', {
        amount: formatCurrency(discount.value),
      })
    }

    // Earlier tier messaging
    return t('promotion_progress_wrapper.partial_savings', {
      amount: formatCurrency(discount.value),
    })
  }
})
</script>
