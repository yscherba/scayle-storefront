<template>
  <div v-if="blok" v-editable="blok">
    <CMSStoryblokLink :to="`${route.path}/${blok._uid}`">
      <NuxtPicture
        class="picture picture-contain w-full sm:block"
        provider="storyblok"
        :src="blok.image.filename"
        :alt="blok.image.alt ?? undefined"
        :sizes="sizes"
      />
    </CMSStoryblokLink>
  </div>
</template>

<script setup lang="ts">
import type { CMSDetailImageProps } from '../types'
import CMSStoryblokLink from './StoryblokLink.vue'
import { useRoute } from '#app/composables/router'
import { NuxtPicture } from '#components'

const { sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSDetailImageProps>()

const route = useRoute()

defineOptions({ name: 'CMSDetailImage' })
</script>
