<template>
  <div class="flex w-full p-3" data-testid="product-promotion-gift-item">
    <div class="relative flex shrink-0 items-center rounded-lg bg-gray-300">
      <SFProductImage
        v-if="image"
        :image="image"
        :alt="alt"
        :image-loading="eagerImageLoading ? 'eager' : 'lazy'"
        sizes="92px"
        :aspect-ratio="[1, 1]"
        class="size-24"
        :class="{ 'opacity-20': disabled }"
      />
      <SFProductPromotionFreeGiftBadge
        :color-style="!disabled ? colorStyle : getDisabledColor(colorStyle)"
        class="absolute left-0 top-0"
      />
    </div>
    <div class="flex w-full flex-row items-center justify-between p-3">
      <div class="flex h-full flex-col justify-between">
        <div>
          <div
            class="text-sm font-semibold"
            :class="disabled ? 'text-secondary' : 'text-primary'"
          >
            {{ brand }}
          </div>
          <SFHeadline
            size="lg"
            data-testid="pdp-product-name"
            tag="h3"
            class="text-sm !font-normal"
            :class="disabled ? 'text-secondary' : 'text-primary'"
          >
            {{ name }}
          </SFHeadline>
        </div>
        <div v-if="!product.isSoldOut" class="flex flex-row items-end gap-2">
          <SFProductPrice
            v-if="price"
            :class="{ disabled: 'opacity-50' }"
            :price="price"
            :show-badges="false"
          />
        </div>
        <div v-else class="text-sm text-product-sold-out">
          {{ $t('global.sold_out') }}
        </div>
      </div>
      <div class="flex items-end justify-between">
        <SFButton
          size="sm"
          variant="raw"
          class="size-11 rounded-xl bg-gray-300"
          data-testid="add-free-product-button"
          :disabled="disabled"
          :aria-label="
            $t('product_promotion_gifts_item.a11y.add_gift', { name })
          "
          @click="$emit('selectGift', product)"
        >
          <IconPlus class="size-6" />
        </SFButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import type { CentAmount, Product, Promotion } from '@scayle/storefront-nuxt'
import Color from 'color'
import SFProductPrice from '../../SFProductPrice.vue'
import SFProductImage from '../../SFProductImage.vue'
import SFProductPromotionFreeGiftBadge from './SFProductPromotionFreeGiftBadge.vue'
import { useProductBaseInfo } from '~/composables'
import { createCustomPrice, type PromotionStyle } from '~/utils'
import { SFButton, SFHeadline } from '#storefront-ui/components'

const { disabled = false, product } = defineProps<{
  product: Product
  promotion: Promotion
  colorStyle: PromotionStyle
  eagerImageLoading: boolean
  disabled?: boolean
}>()

defineEmits<{
  selectGift: [product: Product]
}>()

const {
  name,
  image,
  price: productPrice,
  brand,
  alt,
} = useProductBaseInfo(() => product)

const getDisabledColor = (colorStyle: PromotionStyle) => {
  return {
    backgroundColor: Color(colorStyle.backgroundColor)
      .desaturate(1)
      .alpha(0.5)
      .string(),
    color: Color(colorStyle.color).lighten(1).string(),
  }
}

const price = computed(() => {
  if (!productPrice.value) {
    return
  }

  return createCustomPrice(productPrice.value, {
    withTax: 0 as CentAmount,
    appliedReductions: [
      {
        amount: {
          absoluteWithTax: productPrice.value.withTax as CentAmount,
          relative: 1,
        },
        type: 'relative',
        category: 'promotion',
      },
    ],
  })
})
</script>
