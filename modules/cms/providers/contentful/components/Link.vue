<template>
  <CMSContentfulLink
    v-if="blok && url"
    :to="url"
    :target="blok?.fields.openInNewTab ? '_blank' : '_self'"
  >
    {{ blok?.fields.label }}
  </CMSContentfulLink>
</template>

<script lang="ts" setup>
import type { CMSLinkTypeProps } from '../types'
import CMSContentfulLink from './ContentfulLink.vue'

const { blok } = defineProps<CMSLinkTypeProps>()

const url = blok?.fields?.ctaUrl ?? null
defineOptions({ name: 'CMSLink' })
</script>
