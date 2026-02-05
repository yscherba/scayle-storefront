<template>
  <NuxtPicture
    v-if="blok && imageSource?.src"
    v-element-visibility="onVisible"
    v-editable="blok"
    provider="storyblok"
    class="bg-gray-300"
    :preload="preload"
    :sizes="sizes"
    :img-attrs="{
      class: [
        'w-full h-full',
        {
          'object-contain': !isCover,
          'object-cover object-center': isCover,
        },
      ],
    }"
    :src="imageSource?.src"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import type { CMSImageProps } from '../types'
import {
  getTeaserImage,
  useStoryblokImageSanitizer,
  hasTeaser,
} from '../composables/useStoryblokImage'
import { NuxtPicture } from '#components'

const {
  blok,
  preload,
  isTeaser = false,
  isCover = false,
  sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
} = defineProps<CMSImageProps>()

const tracking = useStorefrontTracking()
const { sanitize } = useStoryblokImageSanitizer()

const hasBeenVisible = ref(false)

const imageSource = computed(() => {
  return isTeaser && hasTeaser(blok) ? getTeaserImage(blok) : sanitize(blok)
})

const onVisible = (state: boolean) => {
  if (!blok.promotion_id || !state || hasBeenVisible.value) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok)
  }
}

defineOptions({ name: 'CMSImage' })
</script>
