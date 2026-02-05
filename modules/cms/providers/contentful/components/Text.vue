<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="prose-sm fill-current">
    <div
      :class="{ '[&>p:first-child]:!mt-0': noMarginTop }"
      v-html="content ?? ''"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import type { CMSParagraphProps, CMSTextProps } from '../types'

const { blok, noMarginTop = false } = defineProps<
  | CMSTextProps
  | (CMSParagraphProps & {
      noMarginTop?: boolean
    })
>()

const content = computed(() => {
  if (!blok) {
    return null
  }
  if ('nodeType' in blok && blok.nodeType === BLOCKS.DOCUMENT) {
    return documentToHtmlString(blok)
  }
  if ('fields' in blok && blok.fields?.body?.nodeType === BLOCKS.DOCUMENT) {
    return documentToHtmlString(blok.fields.body)
  }
  return null
})

defineOptions({ name: 'CMSText' })
</script>
