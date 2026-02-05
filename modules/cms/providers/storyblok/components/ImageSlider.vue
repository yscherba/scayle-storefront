<template>
  <div v-editable="blok" class="md:mx-14" :class="marginClasses">
    <div class="flex w-full justify-between px-6 md:px-0">
      <SFHeadline v-if="blok.headline" tag="p" size="md" is-uppercase>
        {{ blok.headline }}
      </SFHeadline>
      <CMSStoryblokLink
        v-if="blok.cta_url && blok.cta_label"
        :to="blok.cta_url"
        :raw="false"
      >
        {{ blok.cta_label }}
      </CMSStoryblokLink>
    </div>
    <SFItemsSlider
      with-arrows
      class="mt-4 box-border flex overflow-x-auto overflow-y-hidden scrollbar-hide"
    >
      <component
        :is="getComponentName(entry.component)"
        v-for="entry in blok.slides"
        ref="slideElements"
        :key="entry._uid"
        class="box-content shrink-0 snap-start snap-always px-0.5 first:pl-5 last:pr-5 sm:box-border sm:first:pl-0 sm:last:pr-0"
        :blok="entry"
      />
    </SFItemsSlider>
  </div>
</template>

<script setup lang="ts">
import { getComponentName } from '../../../utils/helpers'
import type { CMSImageSliderProps } from '../types'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'
import CMSStoryblokLink from './StoryblokLink.vue'
import { SFItemsSlider, SFHeadline } from '#storefront-ui/components'

const { blok } = defineProps<CMSImageSliderProps>()

const { marginClasses } = useStoryblokMargins(blok)

defineOptions({ name: 'CMSImageSlider' })
</script>
