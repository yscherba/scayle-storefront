<template>
  <SFDropdown
    id="variant-picker-dropdown"
    v-model="activeVariant"
    v-model:visible="isVariantListVisible"
    :items="variants"
    class="h-full"
    radius="xl"
    :disabled="hasOneVariantOnly"
    data-testid="variant-picker"
  >
    <span
      v-if="getFirstAttributeValue(activeVariant?.attributes, 'size')?.label"
      class="font-medium text-black"
    >
      {{ getFirstAttributeValue(activeVariant?.attributes, 'size')?.label }}
    </span>
    <span v-else class="font-medium text-secondary">
      {{ $t('variant_picker.select_size') }}
    </span>
    <template #item="{ item, selectItem }">
      <button
        :disabled="item.stock.quantity === 0"
        class="group flex w-full items-center justify-between space-x-2 border-b border-gray-300 p-2 transition-all first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-none hover:bg-gray-300 focus-visible:shadow-inner-solid-sm"
        :data-testid="`variant-option-${item.id}`"
        :aria-label="
          $t('variant_picker.option.select_option', {
            option: getFirstAttributeValue(item.attributes, 'size')?.label,
          })
        "
        @click="selectItem(item)"
      >
        <span class="flex items-center gap-3">
          <span
            class="size-4 rounded-full border border-secondary bg-white"
            :class="{
              'border-4 !border-accent': item.id === activeVariant?.id,
            }"
          />
          <span
            class="group-disabled:line-through"
            :class="
              item.id === activeVariant?.id ? 'text-black' : 'text-secondary'
            "
          >
            {{ getFirstAttributeValue(item.attributes, 'size')?.label }}
          </span>
        </span>
        <SFProductPrice
          v-if="item.stock.quantity !== 0 && !hidePrice"
          size="lg"
          :promotion="promotion"
          :price="item.price"
          type="normal"
          :show-badges="false"
        />
        <span v-if="item.stock.quantity === 0">{{
          $t('global.sold_out')
        }}</span>
      </button>
    </template>
  </SFDropdown>
</template>

<script setup lang="ts">
import {
  type Promotion,
  getFirstAttributeValue,
  type Variant,
} from '@scayle/storefront-nuxt'
import SFProductPrice from './SFProductPrice.vue'
import { SFDropdown } from '#storefront-ui/components'

const {
  hasOneVariantOnly = false,
  hidePrice = false,
  promotion = undefined,
} = defineProps<{
  variants: Variant[]
  promotion?: Promotion
  hasOneVariantOnly?: boolean
  hidePrice?: boolean
}>()

const isVariantListVisible = defineModel<boolean>('visible', { default: false })

const activeVariant = defineModel<Variant>()
</script>
