<template>
  <div class="sm:mx-14" :class="marginClasses">
    <div class="flex w-full justify-between px-6 sm:px-0">
      <SFHeadline v-if="blok?.fields.headline" tag="p" size="md" is-uppercase>
        {{ blok.fields.headline }}
      </SFHeadline>

      <CMSContentfulLink
        v-if="blok?.fields.ctaUrl && blok.fields.ctaLabel"
        :to="blok.fields.ctaUrl"
        :raw="false"
      >
        {{ blok.fields.ctaUrl }}
      </CMSContentfulLink>
    </div>
    <SFItemsSlider
      with-arrows
      class="mt-4 box-border flex overflow-x-auto overflow-y-hidden scrollbar-hide"
    >
      <component
        :is="getComponentName(entry?.sys?.contentType?.sys?.id) ?? 'div'"
        v-for="entry in blok?.fields.slides"
        ref="slideElements"
        :key="entry?.sys?.contentType?.sys?.id"
        class="box-content shrink-0 snap-start snap-always px-0.5 first:pl-5 last:pr-5 sm:box-border sm:first:pl-0 sm:last:pr-0"
        :blok="entry"
      />
    </SFItemsSlider>
  </div>
</template>

<script setup lang="ts">
import { getComponentName } from '../../../utils/helpers'
import type { CMSImageSliderProps } from '../types'
import { useContentfulMargins } from '../composables/useContentfulMargins'
import CMSContentfulLink from './ContentfulLink.vue'
import { SFItemsSlider, SFHeadline } from '#storefront-ui/components'

const { blok } = defineProps<CMSImageSliderProps>()
const { marginClasses } = useContentfulMargins(blok?.fields.margin)
</script>
