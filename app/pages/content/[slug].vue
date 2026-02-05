<template>
  <div class="m-4 lg:container lg:m-4 lg:mt-8">
    <CMSContentPage :slug="slug" data-testid="content-page">
      <template #loading>
        <SFContentPageSkeletonLoader />
      </template>
    </CMSContentPage>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta, definePageMeta } from '#imports'
import { useRoute } from '#app/composables/router'
import CMSContentPage from '#storefront-cms/components/ContentPage.vue'
import SFContentPageSkeletonLoader from '~/components/SFContentPageSkeletonLoader.vue'

const route = useRoute()

// Remove locale prefix
const slug = computed(() => route.path.split('/').slice(2).join('/'))

const title = computed(() => {
  return slug.value.charAt(0).toUpperCase() + slug.value.slice(1)
})

useSeoMeta({ robots: 'index,follow', title })

defineOptions({ name: 'ContentPage' })
definePageMeta({ pageType: 'content_pages' })
</script>
