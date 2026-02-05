<template>
  <div
    v-if="blok?.fields.ctaUrl"
    class="border border-white px-7 py-3.5 text-sm leading-normal text-white"
  >
    <CMSContentfulLink
      :key="blok?.fields.uid"
      :to="blok?.fields.ctaUrl"
      @click="clickObserver(blok)"
    >
      {{ blok.fields.label }}
    </CMSContentfulLink>
  </div>
</template>

<script setup lang="ts">
import type { CMSBannerLinkProps } from '../types'
import CMSContentfulLink from './ContentfulLink.vue'
import { useTrackingEvents } from '~/composables/useTrackingEvents'

defineProps<CMSBannerLinkProps>()

const { trackPromotion } = useTrackingEvents()

const clickObserver = (link: CMSBannerLinkProps['blok']) => {
  return (
    link?.fields.tracking?.fields.promotion_id &&
    trackPromotion('select_promotion', link.fields.tracking.fields)
  )
}
defineOptions({ name: 'CMSBannerLink' })
</script>
