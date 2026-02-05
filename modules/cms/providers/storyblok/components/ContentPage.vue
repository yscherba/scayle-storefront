<template>
  <CMSStory
    v-if="story && status === 'success'"
    v-bind="$attrs"
    :story="story"
  />
  <slot v-else-if="status === 'pending' || status === 'idle'" name="loading" />
  <slot v-else-if="status === 'error'" name="error">
    <slot name="loading" />
  </slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SbContentPage } from '../types'
import { useCMSBySlug } from '../composables/useCMS'
import { useStoryblokEditor } from '../composables/useStoryblokEditor'
import CMSStory from './Story.vue'

const { slug } = defineProps<{ slug: string }>()

const { data, status } = useCMSBySlug<SbContentPage>(
  `content-page-${slug}`,
  slug,
)

const story = computed(() => data?.value?.data.story)

useStoryblokEditor<SbContentPage>(data)

defineOptions({ name: 'CMSContentPage', inheritAttrs: false })
</script>
