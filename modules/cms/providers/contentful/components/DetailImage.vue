<template>
  <div v-if="blok">
    <CMSContentfulLink :to="`${route.path}/${blok.fields.uid}`">
      <NuxtPicture
        class="picture picture-contain w-full sm:block"
        provider="contentful"
        :src="blok.fields.image?.fields.file?.url"
        :alt="
          blok.fields.image?.fields.title ??
          blok.fields.image?.fields.file?.fileName
        "
        :sizes="sizes"
      />
    </CMSContentfulLink>
  </div>
</template>

<script setup lang="ts">
import type { CMSDetailImageProps } from '../types'
import CMSContentfulLink from './ContentfulLink.vue'
import { useRoute } from '#app/composables/router'
import { NuxtPicture } from '#components'

const { sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSDetailImageProps>()

const route = useRoute()

defineOptions({ name: 'CMSDetailImage' })
</script>
