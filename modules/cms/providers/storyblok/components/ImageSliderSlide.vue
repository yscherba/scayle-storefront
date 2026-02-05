<template>
  <article v-editable="blok" class="box-border w-4/5 shrink-0 sm:w-1/4">
    <NuxtImg
      v-if="isInViewport"
      v-element-visibility="onVisible"
      :src="blok.image.filename"
      sizes="xs:80vw sm:25vw md:25vw lg:25vw xl:25vw"
      provider="storyblok"
      class="aspect-3/4 w-full"
    />
    <div class="mt-4 flex flex-col">
      <div class="pb-1 text-sm font-bold leading-4 sm:pb-0 sm:leading-6">
        {{ blok.topline || '&nbsp;' }}
      </div>
      <SFHeadline
        :size="headlineSize"
        :badge="blok.is_new ? 'NEW' : undefined"
        is-uppercase
        tag="p"
      >
        {{ blok.headline }}
      </SFHeadline>
      <CMSStoryblokLink
        v-if="blok.cta_url.cached_url"
        class="mt-5 text-md font-bold underline"
        :to="blok.cta_url.cached_url"
        :raw="false"
        @click="clickObserver"
      >
        {{ blok.cta_label }}
      </CMSStoryblokLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import { useStorefrontBreakpoints } from '../../../composables/storefront/useStorefrontBreakpoints'
import type { CMSImageSliderSlideProps } from '../types'
import CMSStoryblokLink from './StoryblokLink.vue'
import { NuxtImg } from '#components'
import { SFHeadline } from '#storefront-ui/components'

const { blok } = defineProps<CMSImageSliderSlideProps>()

const storefrontBreakpoints = useStorefrontBreakpoints()
const tracking = useStorefrontTracking()

const isInViewport = ref(true)
const hasBeenVisible = ref(false)

const onVisible = (state: boolean) => {
  if (!blok.promotion_id || !state || hasBeenVisible.value) {
    return
  }

  hasBeenVisible.value = true

  if (tracking) {
    tracking.trackPromotion('view_promotion', blok)
  }
}

const clickObserver = () => {
  if (blok?.promotion_id && tracking) {
    tracking.trackPromotion('select_promotion', blok)
  }
}
const headlineSize = computed(() =>
  storefrontBreakpoints && storefrontBreakpoints.isSmaller('md') ? 'xl' : '2xl',
)
defineOptions({ name: 'CMSImageSliderSlide' })
</script>
