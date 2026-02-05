<template>
  <div
    :id="trimAnchorSymbol(blok.anchor_id)"
    v-editable="blok"
    class="prose mb-10 flex w-full flex-col last:mb-0"
    :class="{
      'scroll-mt-8': blok.anchor_id,
    }"
    :style="style"
  >
    <SFHeadline
      :tag="blok.headline_tag ? blok.headline_tag : 'h3'"
      :size="getHeadlineSize(blok.headline_tag)"
      class="mb-2"
    >
      {{ blok.headline }}
    </SFHeadline>
    <div
      v-if="blok.cta?.linktype === 'email'"
      class="grid grid-cols-2 justify-items-start gap-8"
    >
      <SFButton variant="tertiary" is-full-width>{{ blok.cta.email }}</SFButton>
      <div class="max-w-lg">
        <CMSText :blok="{ ...blok, component: 'CmsText' }" />
      </div>
    </div>
    <CMSText v-else :blok="{ ...blok, component: 'CmsText' }" />
    <template v-if="blok.nested_items">
      <component
        :is="getComponentName(nestedItem.component)"
        v-for="nestedItem in blok.nested_items"
        :key="nestedItem._uid"
        :blok="nestedItem"
      />
    </template>
    <div class="flex flex-row space-x-8">
      <div
        v-for="paragraphImage in blok.images"
        :key="`store-${paragraphImage.id}`"
        class="flex flex-row space-x-8"
      >
        <CMSStoryblokLink
          v-if="paragraphImage.name"
          :to="paragraphImage.name"
          target="_blank"
        >
          <NuxtPicture
            class="cms-picture picture-contain"
            height="25px"
            provider="storyblok"
            :src="paragraphImage.filename"
            :alt="paragraphImage.alt"
          />
        </CMSStoryblokLink>
        <NuxtPicture
          v-else
          class="cms-picture picture-contain"
          height="25px"
          provider="storyblok"
          :src="paragraphImage.filename"
          :alt="paragraphImage.alt"
        />
      </div>
    </div>
    <div class="max-w-lg text-sm text-secondary">
      {{ blok.sub_title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SbNestedParagraph } from '../types/storyblok'
import { getComponentName } from '../../../utils/helpers'
import CMSText from './Text.vue'
import CMSStoryblokLink from './StoryblokLink.vue'
import { NuxtPicture } from '#components'
import { SFHeadline, SFButton } from '#storefront-ui/components'

const { blok } = defineProps<{ blok: SbNestedParagraph }>()

function trimAnchorSymbol(anchorId?: string): string | undefined {
  if (!anchorId) {
    return
  }
  return anchorId.startsWith('#') ? anchorId.substring(1) : anchorId
}

const style = computed(() =>
  blok?.background_color
    ? { backgroundColor: blok?.background_color }
    : undefined,
)

function getHeadlineSize(size?: string) {
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
