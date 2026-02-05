<template>
  <div
    class="rounded-br-lg rounded-tl-lg p-0.5 px-1.5 text-sm font-semibold uppercase"
    :style="colorStyle"
  >
    {{ $t('promotion.free_label') }}
  </div>
</template>

<script setup lang="ts">
import type { PromotionStyle } from '~/utils'

defineProps<{
  colorStyle: PromotionStyle
}>()
</script>
