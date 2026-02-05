<template>
  <div v-editable="blok" class="relative">
    <component
      :is="getComponentName(content.component)"
      v-if="content"
      :key="blok._uid"
      :blok="content"
      :sizes="sizes"
    />
    <div
      v-if="blok.headline"
      class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold leading-tight text-white"
    >
      {{ blok.headline }}
    </div>
    <CMSStoryblokLink
      v-if="hasCta && blok.cta_link?.cached_url"
      :to="blok.cta_link.cached_url"
      class="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center font-bold leading-6 text-white underline underline-offset-2"
    >
      {{ blok.cta }}
    </CMSStoryblokLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CMSGridTileProps } from '../types'
import { getComponentName } from '../../../utils/helpers'
import CMSStoryblokLink from './StoryblokLink.vue'

const { blok, sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSGridTileProps>()

const content = computed(() => blok?.content?.[0])
const hasCta = computed(() => blok?.cta && blok?.cta_link)

defineOptions({ name: 'CMSGridTile' })
</script>
