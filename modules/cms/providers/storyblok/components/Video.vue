<template>
  <div>
    <video
      ref="element"
      class="size-full object-contain object-center"
      :class="[marginClasses[0], containerClasses]"
      :controls="blok.has_controls"
      :disable-picture-in-picture="!blok.has_controls"
      :autoplay="blok.autoplay"
      :loop="blok.loop"
      :src="blok.video.filename"
      :poster="videoPoster"
      @click="clickObserver"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { CMSVideoProps } from '../types'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'
import { useTrackingEvents } from '~/composables'
import { useDefaultBreakpoints } from '#storefront-ui/composables'
import { useImage } from '#imports'

const { blok } = defineProps<CMSVideoProps>()

const { isSmaller } = useDefaultBreakpoints()

const { marginClasses } = useStoryblokMargins(blok)
const { trackPromotion } = useTrackingEvents()

const img = useImage()

const containerClasses = computed(() => ({
  container: blok.is_containered,
}))

const videoPoster = computed(() => {
  if (!(blok.preview_desktop_image || blok.preview_mobile_image)) {
    return
  }

  const key = isSmaller('md') ? 'preview_mobile_image' : 'preview_desktop_image'

  if (!blok[key]?.filename) {
    return
  }

  return img(blok[key]!.filename, {}, { provider: 'storyblok' })
})

const element = ref(null)

const { stop } = useIntersectionObserver(
  element,
  (entries) => {
    if (!entries[0]) {
      return
    }
    if (entries[0].isIntersecting && blok.promotion_id) {
      trackPromotion('view_promotion', blok)
      stop()
    }
  },
  {
    threshold: 0.5,
  },
)

const clickObserver = blok.promotion_id
  ? () => trackPromotion('select_promotion', blok)
  : () => {}

defineOptions({ name: 'CMSVideo' })
</script>
