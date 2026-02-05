<template>
  <article v-if="blok" class="box-border w-4/5 shrink-0 sm:w-1/4">
    <NuxtImg
      v-if="isInViewport"
      v-element-visibility="onVisible"
      :src="blok?.fields.image?.fields.file?.url"
      sizes="xs:80vw sm:25vw md:25vw lg:25vw xl:25vw"
      provider="contentful"
      class="aspect-3/4 w-full"
    />
    <div class="mt-4 flex flex-col">
      <div class="pb-1 text-sm font-bold leading-4 md:pb-0 md:leading-6">
        {{ blok?.fields.topline || '&nbsp;' }}
      </div>
      <SFHeadline
        :size="headlineSize"
        :badge="blok?.fields.isNew ? 'NEW' : undefined"
        is-uppercase
        tag="p"
      >
        {{ blok?.fields.headline }}
      </SFHeadline>

      <CMSContentfulLink
        v-if="blok?.fields.ctaUrl"
        class="mt-5 text-md font-bold underline"
        :to="blok?.fields.ctaUrl"
        :raw="false"
        @click="clickObserver"
      >
        {{ blok?.fields.ctaLabel }}
      </CMSContentfulLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import { useStorefrontBreakpoints } from '../../../composables/storefront/useStorefrontBreakpoints'
import type { CMSImageSliderSlideProps } from '../types'
import CMSContentfulLink from './ContentfulLink.vue'
import { NuxtImg } from '#components'
import { SFHeadline } from '#storefront-ui/components'

const { blok } = defineProps<CMSImageSliderSlideProps>()

const storefrontBreakpoints = useStorefrontBreakpoints()
const tracking = useStorefrontTracking()

const isInViewport = ref(true)
const hasBeenVisible = ref(false)

const onVisible = (state: boolean) => {
  if (
    !blok?.fields?.tracking?.fields.promotion_id ||
    !state ||
    hasBeenVisible.value
  ) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok?.fields.tracking.fields)
  }
}

const clickObserver = () => {
  if (blok?.fields?.tracking?.fields.promotion_id && tracking) {
    tracking.trackPromotion('select_promotion', blok?.fields.tracking.fields)
  }
}

const headlineSize = computed(() =>
  storefrontBreakpoints && storefrontBreakpoints.isSmaller('md') ? 'xl' : '2xl',
)
defineOptions({ name: 'CMSImageSliderSlide' })
</script>
