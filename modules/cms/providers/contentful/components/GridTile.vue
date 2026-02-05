<template>
  <div v-if="blok" class="relative">
    <component
      :is="getComponentName(content?.sys.contentType?.sys.id) ?? 'div'"
      v-for="content in blok?.fields.content"
      :key="content?.sys.id"
      :blok="content"
      :sizes="sizes"
    />
    <div
      v-if="blok?.fields.headline"
      class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold leading-tight text-white"
    >
      {{ blok?.fields.headline }}
    </div>
    <CMSContentfulLink
      v-if="hasCta && blok?.fields.ctaLink"
      :to="blok?.fields.ctaLink"
      class="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center font-bold leading-6 text-white underline underline-offset-2"
    >
      {{ blok?.fields.cta }}
    </CMSContentfulLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getComponentName } from '../../../utils/helpers'
import type { CMSGridTile } from '../types'
import CMSContentfulLink from './ContentfulLink.vue'

const { blok, sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSGridTile>()

const hasCta = computed(() => blok?.fields.cta && blok?.fields.ctaLink)

defineOptions({ name: 'CMSGridTile' })
</script>
