<template>
  <div v-if="blok && imageSource.src" :class="marginClasses">
    <CMSContentfulLink
      v-if="blok.fields.ctaUrl"
      :target="isLinkTypeUrl ? '_blank' : '_self'"
      :to="blok.fields.ctaUrl"
      @click="clickObserver"
    >
      <NuxtImg
        v-element-visibility="[onVisible, { threshold: 0.5 }]"
        provider="contentful"
        class="size-full object-cover"
        :src="imageSource.src"
        :alt="imageSource.alt"
        :sizes="sizes"
      />
    </CMSContentfulLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import { isStringURL } from '../../../utils/helpers'
import type { CMSClickableImageProps } from '../types'
import { useContentfulMargins } from '../composables/useContentfulMargins'
import { useContentfulImageSanitizer } from '../composables/useContentfulImage'
import CMSContentfulLink from './ContentfulLink.vue'
import { NuxtImg } from '#components'

const { blok, sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSClickableImageProps>()

const hasBeenVisible = ref(false)

const { marginClasses } = useContentfulMargins(blok?.fields.marginTop)
const tracking = useStorefrontTracking()
const image = computed(() => blok?.fields.image.at(0)?.fields)
const { sanitize } = useContentfulImageSanitizer()
const imageSource = computed(() => sanitize(blok?.fields.image.at(0)))

/**
 * TODO: check if this is the correct way to handle the link
 * storyblok uses cta_url.cached_url is this the same as ctaUrl?
 */
const isLinkTypeUrl = computed(() => isStringURL(blok?.fields.ctaUrl ?? ''))

const onVisible = (state: boolean) => {
  if (
    !blok?.fields.tracking?.fields.promotion_id ||
    !state ||
    hasBeenVisible.value
  ) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok.fields.tracking.fields)
  }
}

const clickObserver = image.value?.tracking?.fields.promotion_id
  ? () =>
      tracking &&
      tracking.trackPromotion(
        'select_promotion',
        image.value?.tracking?.fields ?? {},
      )
  : () => {}

defineOptions({ name: 'CMSClickableImage' })
</script>
