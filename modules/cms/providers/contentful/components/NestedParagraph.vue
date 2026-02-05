<template>
  <div
    v-if="blok"
    :id="trimAnchorSymbol(blok.fields.anchorId)"
    class="prose mb-10 flex w-full flex-col"
    :class="{
      'scroll-mt-8': blok?.fields?.anchorId,
    }"
    :style="style"
  >
    <SFHeadline
      :tag="blok?.fields.headlineTag ? blok?.fields.headlineTag : 'h3'"
      :size="getHeadlineSize(blok?.fields.headlineTag)"
      class="mb-2"
    >
      {{ blok?.fields.headline }}
    </SFHeadline>
    <div v-if="isCtaEmail" class="grid grid-cols-2 justify-items-start gap-8">
      <SFButton variant="tertiary" is-full-width>
        {{ blok?.fields.cta }}
      </SFButton>
      <div class="max-w-lg">
        <CMSText v-if="blok?.fields.body" :blok="blok?.fields.body" />
      </div>
    </div>
    <template v-else>
      <CMSText :blok="blok?.fields.body ?? null" />
    </template>

    <template v-if="blok?.fields.nestedItems">
      <component
        :is="getComponentName(nestedItem?.sys.contentType.sys.id)"
        v-for="nestedItem in blok.fields.nestedItems"
        :key="nestedItem?.sys.id"
        :blok="nestedItem"
      />
    </template>
    <div class="flex flex-row space-x-8">
      <div
        v-for="paragraphImage in blok?.fields.images"
        :key="`store-${paragraphImage?.fields.file?.fileName}`"
        class="flex flex-row space-x-8"
      >
        <CMSContentfulLink
          v-if="paragraphImage?.fields.file"
          :to="paragraphImage.fields.file?.url"
          target="_blank"
        >
          <NuxtPicture
            class="cms-picture picture-contain"
            height="25px"
            provider="contentful"
            :src="paragraphImage.fields.file?.url"
            :alt="
              paragraphImage.fields.title ??
              paragraphImage.fields.file?.fileName
            "
          />
        </CMSContentfulLink>
        <NuxtPicture
          v-else
          class="cms-picture picture-contain"
          height="25px"
          provider="contentful"
          :src="paragraphImage?.fields.file?.url"
          :alt="
            paragraphImage?.fields.title ??
            paragraphImage?.fields.file?.fileName
          "
        />
      </div>
    </div>
    <div class="max-w-lg text-sm text-secondary">
      {{ blok?.fields.subTitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CMSNestedParagraphProps } from '../types/contentful-defs'
import { EMAIL_REGEX_PATTERN, getComponentName } from '../../../utils/helpers'
import CMSText from './Text.vue'
import CMSContentfulLink from './ContentfulLink.vue'
import { NuxtPicture } from '#components'
import { SFHeadline, SFButton } from '#storefront-ui/components'

const { blok } = defineProps<CMSNestedParagraphProps>()

const isCtaEmail = computed(() => {
  return String(blok?.fields.cta ?? '')
    .toLowerCase()
    .match(EMAIL_REGEX_PATTERN)
})

function trimAnchorSymbol(anchorId?: string): string | undefined {
  return anchorId?.startsWith('#') ? anchorId.substring(1) : anchorId
}

const style = computed(() =>
  blok?.fields.backgroundColor
    ? { backgroundColor: blok?.fields.backgroundColor }
    : undefined,
)

function getHeadlineSize(size: string | undefined) {
  if (!size) {
    return 'sm'
  }
  switch (size) {
    case 'h2':
      return 'xl'
    case 'h3':
      return 'lg'
    case 'h4':
      return 'md'
    case 'h5':
      return 'sm'
    default:
      return 'sm'
  }
}

defineOptions({ name: 'CMSNestedParagraph' })
</script>
