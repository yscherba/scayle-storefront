<template>
  <div v-if="blok" v-editable="blok">
    <div v-if="blok.headline || blok.subline" class="my-8">
      <SFHeadline v-if="blok.headline" size="xl" tag="h1" is-uppercase>
        {{ blok.headline }}
      </SFHeadline>
      <p v-if="blok.subline" class="my-8">{{ blok.subline }}</p>
    </div>
    <div v-for="content in blok.content" :key="content._uid">
      <component
        :is="getComponentName(content.component)"
        :blok="content"
        :important="content.component === 'Paragraph'"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends SbContentPage">
import { computed } from 'vue'
import type { ISbStoryData } from '@storyblok/vue'
import type { SbContentPage } from '../types'
import { getComponentName } from '../../../utils/helpers'
import { useSeoMeta } from '#imports'
import { SFHeadline } from '#storefront-ui/components'

const { story } = defineProps<{ story: ISbStoryData<T> }>()

const blok = computed(() => story.content)

const seo = computed(() => blok.value.SEO)

useSeoMeta({
  description: seo.value?.description,
  robots: 'index,follow',
  twitterTitle: seo.value?.twitter_description,
  twitterDescription: seo.value?.twitter_description,
  twitterImage: seo.value?.twitter_image,
  ogTitle: seo.value?.og_title,
  ogDescription: seo.value?.og_description,
  ogImage: seo.value?.og_image,
})

defineOptions({ name: 'CMSStory' })
</script>
