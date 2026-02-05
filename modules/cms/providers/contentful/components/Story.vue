<template>
  <div v-if="fields">
    <div v-if="fields.headline || fields.subline" class="my-8">
      <SFHeadline v-if="fields.headline" size="xl" tag="h1" is-uppercase>
        {{ fields.headline }}
      </SFHeadline>
      <p v-if="fields.subline" class="my-8">
        {{ fields.subline }}
      </p>
    </div>
    <div v-for="content in fields.content" :key="content?.sys?.id">
      <component
        :is="getComponentName(content?.sys?.contentType?.sys?.id)"
        :blok="content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Entry } from 'contentful'
import type { TypeContentPageWithoutUnresolvableLinksResponse } from '../types'
import { getComponentName } from '../../../utils/helpers'
import { useSeoMeta } from '#imports'
import { SFHeadline } from '#storefront-ui/components'

const { story } = defineProps<{ story: Entry }>()

const blok = computed(
  () => story as TypeContentPageWithoutUnresolvableLinksResponse,
)

const fields = computed(() => blok.value.fields)

const seo = computed(() => fields?.value?.seo?.fields)

useSeoMeta({
  description: seo.value?.description ?? '',
  title: seo.value?.title ?? fields.value?.headline ?? '',
  robots: 'index,follow',
  twitterTitle: seo.value?.twitterTitle ?? '',
  twitterDescription: seo.value?.twitterDescription ?? '',
  twitterImage: seo.value?.twitterImage?.fields?.file?.url ?? '',
  ogTitle: seo.value?.ogTitle ?? '',
  ogDescription: seo.value?.ogDescription ?? '',
  ogImage: seo.value?.ogImage?.fields?.file?.url ?? '',
})

defineOptions({ name: 'CMSStory' })
</script>
