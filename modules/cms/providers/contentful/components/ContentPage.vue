<template>
  <CMSStory
    v-if="resolvedData && status === 'success'"
    v-bind="$attrs"
    :story="resolvedData"
  />
  <slot v-else-if="status === 'pending' || status === 'idle'" name="loading" />
  <slot v-else-if="status === 'error'" name="error">
    <slot name="loading" />
  </slot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  TypeContentPageWithoutUnresolvableLinksResponse,
  TypeContentPageSkeleton,
} from '../types'
import { useCMSBySlug } from '../composables/useCMS'
import CMSStory from './Story.vue'

const { slug } = defineProps<{ slug: string }>()

const { data, status } = useCMSBySlug<TypeContentPageSkeleton>(
  `content-page-${slug}`,
  {
    content_type: 'contentPage',
    'fields.slug[match]': slug,
  },
)

const resolvedData = computed(() => {
  const res = data.value as TypeContentPageWithoutUnresolvableLinksResponse

  return {
    ...res,
    uuid: res?.fields.uid ?? '',
    _uid: res?.fields.uid ?? '',
    slug: res?.fields.slug ?? '',
    teaser_image: res?.fields.teaserImage ?? '',
    teaser_image_mobile: res?.fields.teaserImageMobile ?? '',
    headline: res?.fields.headline ?? '',
    subline: res?.fields.subline ?? '',
    content: res?.fields.content ?? [],
    name: res?.fields.headline ?? '',
    seo: res?.fields.seo ?? {},
  }
})

defineOptions({ name: 'CMSContentPage', inheritAttrs: false })
</script>
