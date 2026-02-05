<template>
  <div v-if="blok">
    <video
      ref="element"
      class="size-full object-contain object-center"
      :class="[marginClasses[0], containerClasses]"
      :controls="blok?.fields.has_controls"
      :disable-picture-in-picture="!blok.fields.has_controls"
      :autoplay="blok.fields.autoplay"
      :loop="blok.fields.loop"
      :src="blok.fields.video?.fields.file?.url"
      :poster="videoPoster"
      @click="clickObserver"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { CMSVideoProps } from '../types'
import { useContentfulMargins } from '../composables/useContentfulMargins'
import { useTrackingEvents } from '~/composables'
import { useDefaultBreakpoints } from '#storefront-ui/composables'
import { useImage } from '#imports'

const { blok } = defineProps<CMSVideoProps>()

const { isSmaller } = useDefaultBreakpoints()

const { marginClasses } = useContentfulMargins(blok?.fields.marginTop)
const { trackPromotion } = useTrackingEvents()

const img = useImage()

const containerClasses = computed(() => ({
  container: blok?.fields.is_containered,
}))

const videoPoster = computed(() => {
  if (!(blok?.fields.preview_desktop_image || blok)) {
    return
  }

  const key = isSmaller('md') ? 'preview_mobile_image' : 'preview_desktop_image'

  if (!blok.fields[key]?.fields.file?.fileName) {
    return
  }

  return img(
    blok.fields[key]!.fields.title ??
      blok.fields[key]!.fields.file?.fileName ??
      '',
    {},
    { provider: 'contentful' },
  )
})

const element = ref(null)

const { stop } = useIntersectionObserver(
  element,
  (entries) => {
    if (!entries[0]) {
      return
    }
    if (
      entries[0]!.isIntersecting &&
      blok?.fields.tracking?.fields?.promotion_id
    ) {
      trackPromotion('view_promotion', blok.fields.tracking.fields!)
      stop()
    }
  },
  {
    threshold: 0.5,
  },
)

const clickObserver = blok?.fields.tracking?.fields.promotion_id
  ? () =>
      trackPromotion('select_promotion', blok?.fields.tracking?.fields ?? {})
  : () => {}

defineOptions({ name: 'CMSVideo' })
</script>
