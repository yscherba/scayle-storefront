<template>
  <CMSStoryblokLink
    v-if="url"
    :to="url"
    :target="blok.open_in_new_tab ? '_blank' : '_self'"
  >
    {{ blok.label }}
  </CMSStoryblokLink>
</template>

<script lang="ts" setup>
import type { CMSLinkTypeProps } from '../types'
import CMSStoryblokLink from './StoryblokLink.vue'

const { blok } = defineProps<CMSLinkTypeProps>()

const url = blok?.cta_url?.cached_url ?? null

defineOptions({ name: 'CMSLink' })
</script>
