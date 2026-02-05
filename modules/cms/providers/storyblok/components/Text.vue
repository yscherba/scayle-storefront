<template>
  <div v-editable="blok" class="prose-sm fill-current">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div :class="{ '[&>p:first-child]:!mt-0': noMarginTop }" v-html="content" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  richTextResolver,
  type StoryblokRichTextNode,
} from '@storyblok/richtext'
import type { CMSTextProps } from '../types'

const { blok, noMarginTop = false } = defineProps<CMSTextProps>()

const content = computed(() =>
  richTextResolver().render(blok.body as unknown as StoryblokRichTextNode),
)
defineOptions({ name: 'CMSText' })
</script>

<style>
h4,
h4 span {
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
}
h3,
h3 span {
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  font-weight: 700;
}
h1,
h2,
h3,
h4,
h5,
h6:has(span[id]) {
  scroll-margin-block-start: 32px;
}
</style>
