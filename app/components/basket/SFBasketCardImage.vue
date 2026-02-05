<template>
  <div
    class="relative flex w-full grow items-center justify-center overflow-hidden rounded-lg bg-gray-100"
    :class="isSmallSize ? 'max-w-28' : 'max-w-36'"
  >
    <SFLocalizedLink v-if="link" class="w-full" :to="link" raw tabindex="-1">
      <SFProductImage
        v-if="image"
        :image="image"
        :alt="alt"
        :sizes="isSmallSize ? '112px' : '144px'"
        class="overflow-hidden rounded-lg"
        :class="[{ 'opacity-60': isSoldOut }]"
      />
      <div
        v-if="isCampaignProduct || basketItem.promotion"
        class="absolute bottom-6 ml-1 flex w-full flex-col gap-1"
      >
        <SFDealBadge
          v-if="isCampaignProduct"
          :text="campaignText || $t('campaign.deal')"
          :style="getCampaignStyle(campaign)"
        />
        <SFDealBadge
          v-if="basketItem.promotion && basketItem.promotion.isValid"
          :text="promotionText || $t('promotion.deal')"
          :style="style"
        />
      </div>
    </SFLocalizedLink>
    <div
      v-if="!hideWishlistToggle"
      class="absolute left-auto right-1 top-2 z-10 flex h-8 w-auto cursor-pointer p-1 transition lg:right-0 lg:top-0 lg:h-12 lg:p-3"
    >
      <SFWishlistToggle :product="basketItem.product" @click.stop />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { BasketItem, Campaign } from '@scayle/storefront-nuxt'
import SFDealBadge from '../deal/SFDealBadge.vue'
import SFLocalizedLink from '~/components/SFLocalizedLink.vue'
import SFProductImage from '~/components/product/SFProductImage.vue'
import SFWishlistToggle from '~/components/product/SFWishlistToggle.vue'
import { useProductBaseInfo } from '~/composables'
import { getPromotionStyle, getCampaignStyle } from '~/utils'

const {
  basketItem,
  isSoldOut,
  isSmallSize = false,
  hideWishlistToggle = false,
  campaign,
} = defineProps<{
  basketItem: BasketItem
  isSoldOut: boolean
  isSmallSize?: boolean
  hideWishlistToggle?: boolean
  campaign?: Campaign | null
}>()

const { image, alt, link } = useProductBaseInfo(basketItem.product)

const promotionText = computed(() => {
  return basketItem.promotion?.customData.product?.badgeLabel
})

const campaignText = computed(() => {
  return campaign?.product?.badgeLabel
})

const isCampaignProduct = computed(() => {
  return basketItem.price.total.appliedReductions.some(
    (reduction) => reduction.category === 'campaign',
  )
})

const style = computed(() => {
  const promotion = basketItem.promotion
  return getPromotionStyle(promotion)
})
</script>
