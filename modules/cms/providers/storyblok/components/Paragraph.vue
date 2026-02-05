<template>
  <div
    :id="blok.anchor_id"
    v-editable="blok"
    class="prose mb-10 flex w-full flex-col"
    :class="{ 'scroll-mt-8': blok.anchor_id }"
    :style="style"
  >
    <SFHeadline size="sm" tag="h3">{{ blok.headline }}</SFHeadline>
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
import type { CMSParagraphProps } from '../types/storyblok'
import CMSText from './Text.vue'
import CMSStoryblokLink from './StoryblokLink.vue'
import { NuxtPicture } from '#components'
import { SFHeadline, SFButton } from '#storefront-ui/components'

const { blok } = defineProps<CMSParagraphProps>()

const style = computed(() =>
  blok?.background_color
    ? { backgroundColor: blok?.background_color }
    : undefined,
)

defineOptions({ name: 'CmsParagraph' })
</script>
