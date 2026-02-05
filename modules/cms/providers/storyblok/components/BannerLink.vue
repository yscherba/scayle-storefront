<template>
  <div
    v-if="blok.cta_url?.cached_url"
    v-editable="blok"
    class="border border-white px-7 py-3.5 text-sm leading-normal text-white"
  >
    <CMSStoryblokLink
      :key="blok._uid"
      :to="blok.cta_url?.cached_url"
      @click="clickObserver(blok)"
    >
      {{ blok.label }}
    </CMSStoryblokLink>
  </div>
</template>

<script setup lang="ts">
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import type { SbBannerLink } from '../types'
import CMSStoryblokLink from './StoryblokLink.vue'

defineProps<{ blok: SbBannerLink }>()

const tracking = useStorefrontTracking()

const clickObserver = (link: SbBannerLink) => {
  return (
    link.promotion_id &&
    tracking &&
    tracking.trackPromotion('select_promotion', link)
  )
}
defineOptions({ name: 'CMSBannerLink' })
</script>
