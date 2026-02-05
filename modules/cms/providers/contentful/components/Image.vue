<template>
  <NuxtPicture
    v-if="blok && imageSource.src"
    v-element-visibility="onVisible"
    provider="contentful"
    class="h-full bg-gray-300"
    :sizes="sizes"
    :src="imageSource.src"
    :preload="preload"
    :alt="imageSource.alt"
    :img-attrs="{
      class: [
        'w-full h-full',
        {
          'object-contain': !isCover,
          'object-cover object-center': isCover,
        },
      ],
    }"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import {
  getTeaserImage,
  useContentfulImageSanitizer,
} from '../composables/useContentfulImage'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import type {
  CMSImageProps,
  TypePageWithoutUnresolvableLinksResponse,
} from '../types'
import { NuxtPicture } from '#components'

const {
  blok,
  preload,
  isTeaser = false,
  isCover = false,
  sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
} = defineProps<CMSImageProps>()

const tracking = useStorefrontTracking()
const { sanitize } = useContentfulImageSanitizer()
const hasBeenVisible = ref(false)

const imageSource = computed(() =>
  isTeaser
    ? getTeaserImage(blok as TypePageWithoutUnresolvableLinksResponse)
    : sanitize(blok),
)

const onVisible = (state: boolean) => {
  const promotionId = blok?.fields.tracking?.fields.promotion_id

  if (!promotionId || !state || hasBeenVisible.value) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok.fields.tracking.fields)
  }
}

defineOptions({ name: 'CMSImage' })
</script>
