<template>
  <CMSImage v-if="hasTeaserImage" :blok="content" is-teaser is-cover />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TypeListingPageSkeleton } from '../types'
import { useCMSBySlug } from '../composables/useCMS'
import { useContentfulEditor } from '../composables/useContentfulEditor'
import CMSImage from './Image.vue'

const { categoryId } = defineProps<{ categoryId: number }>()

const { data } = await useCMSBySlug<TypeListingPageSkeleton>(
  `listing-page-teaser`,
  computed(() => ({
    content_type: 'listingPage',
    // NOTE: We need to pass both the `c/` path, as well as the prefix `c-` plus
    // the selected categoryID to the useCMSBySlug composables.
    // Contentful requires also to set `c/c-{selectedCategory} to be set as `Slug`
    // within the related story.
    // This allows the Contentful Preview functionality to properly work.
    'fields.slug[match]': `c/c-${categoryId}`,
  })),
)

useContentfulEditor<TypeListingPageSkeleton>(data)

const content = computed(() => data.value)

const hasTeaserImage = computed(() => {
  return !!data.value?.fields.teaserImage?.fields.file?.url
})

defineOptions({ name: 'CMSProductListingPageTeaser' })
</script>
