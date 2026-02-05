<template>
  <div
    class="flex flex-wrap items-center gap-1"
    :class="{ 'flex-col !items-end justify-end': !inline }"
  >
    <div v-if="showBadges && relativeReductions.length" class="flex gap-1">
      <span
        v-for="({ value, category }, index) in relativeReductions"
        :key="`${value}-badge-${category}-${index}`"
        class="mr-1 inline-block rounded bg-product-sale px-1 text-sm font-semibold text-white"
        :style="
          (category === 'promotion' && promotionStyle) ||
          (category === 'campaign' && campaignStyle)
        "
      >
        -{{ value }}%
      </span>
    </div>
    <p class="text-primary" :class="classes" data-testid="price">
      <template v-if="showPriceFrom">
        {{ $t('price.starting_from') }}
      </template>
      {{ formatCurrency(totalPrice) }}
      <span
        v-for="(reduction, index) in strikeThroughPrices"
        :key="`${reduction}-${index}`"
        class="mr-1 font-normal text-secondary line-through last-of-type:mr-0"
        data-testid="initialProductPrice"
      >
        {{ formatCurrency(reduction) }}
      </span>
    </p>

    <sup
      v-if="showTaxInfo"
      class="ml-1 text-right text-sm text-secondary md:text-left"
      data-testid="tax-info"
    >
      {{ $t('global.including_vat') }}
    </sup>
    <div
      v-if="
        lowestPriorPrice?.withTax &&
        lowestPriorPrice?.relativeDifferenceToPrice !== null
      "
      class="mt-1 w-full text-sm text-secondary"
      :class="{ 'text-end': !inline }"
      data-testid="lowest-prior-price"
    >
      {{ $t('price.30_day_best_price') }}
      {{ formatCurrency(lowestPriorPrice.withTax) }}
      ({{
        formatPercentage(lowestPriorPrice.relativeDifferenceToPrice, {
          signDisplay: 'exceptZero',
        })
      }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  LowestPriorPrice,
  Price,
  Promotion,
  Campaign,
} from '@scayle/storefront-nuxt'
import { Size } from '#storefront-ui'
import { getPromotionStyle, getCampaignStyle } from '~/utils'
import {
  useFormatHelpers,
  useProductPrice,
  type BasketItemPrice,
} from '#storefront/composables'
import type { OrderPrice } from '~~/types/order'

const {
  showTaxInfo = false,
  showPriceFrom = false,
  showBadges = true,
  size = Size.MD,
  type = 'normal',
  promotion = undefined,
  campaign = undefined,
  price,
  inline = true,
  lowestPriorPrice = undefined,
} = defineProps<{
  price: Price | BasketItemPrice | OrderPrice
  lowestPriorPrice?: LowestPriorPrice
  promotion?: Promotion | null
  campaign?: Campaign | null
  showTaxInfo?: boolean
  showPriceFrom?: boolean
  showBadges?: boolean
  size?: Size
  type?: 'normal' | 'whisper' | 'loud'
  inline?: boolean
}>()

const {
  appliedReductions,
  strikeThroughPrices,
  relativeReductions,
  totalPrice,
} = useProductPrice(() => price)

const { formatCurrency, formatPercentage } = useFormatHelpers()

const promotionStyle = computed(() => getPromotionStyle(promotion))
const campaignStyle = computed(() => getCampaignStyle(campaign))
const classes = computed(() => ({
  'text-xl': size === Size.XL,
  'text-lg': size === Size.LG,
  'text-sm': size === Size.SM,
  'text-md': size === Size.MD,
  'font-bold': type === 'loud',
  'font-semibold': type === 'whisper',
  'font-normal': type === 'normal',
  'text-product-sale': appliedReductions.value.length,
  'text-end': !inline,
}))
</script>
