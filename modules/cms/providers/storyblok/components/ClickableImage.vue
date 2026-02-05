<template>
  <div v-if="blok && imageSource?.src" v-editable="blok" :class="marginClasses">
    <CMSStoryblokLink
      v-if="blok.cta_url.cached_url"
      :target="isLinkTypeUrl ? '_blank' : '_self'"
      :to="blok.cta_url.cached_url"
      @click="clickObserver"
    >
      <NuxtImg
        v-element-visibility="[onVisible, { threshold: 0.5 }]"
        provider="storyblok"
        class="size-full object-cover"
        :src="imageSource.src"
        :alt="imageSource.alt"
        :sizes="sizes"
      />
    </CMSStoryblokLink>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import type { CMSClickableImageProps } from '../types'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'
import { useStoryblokImageSanitizer } from '../composables/useStoryblokImage'
import CMSStoryblokLink from './StoryblokLink.vue'
import { NuxtImg } from '#components'

const { sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw', blok } =
  defineProps<CMSClickableImageProps>()

const { marginClasses } = useStoryblokMargins(blok)
const tracking = useStorefrontTracking()
const image = computed(() => blok?.image[0])
const { sanitize } = useStoryblokImageSanitizer()
const imageSource = computed(() => {
  if (!image.value) {
    return
  }
  return sanitize(image.value)
})

const hasBeenVisible = ref(false)

const isLinkTypeUrl = computed(() => blok.cta_url.linktype === 'url')

const onVisible = (state: boolean) => {
  if (!blok.promotion_id || !state || hasBeenVisible.value) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok)
  }
}

const clickObserver = image.value?.promotion_id
  ? () => tracking && tracking.trackPromotion('select_promotion', image.value!)
  : () => {}

defineOptions({ name: 'CMSClickableImage' })
</script>
