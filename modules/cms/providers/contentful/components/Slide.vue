<template>
  <div v-if="blok">
    <template v-if="blok?.fields.image">
      <component
        :is="getSlideComponent(image)"
        v-for="image in blok?.fields.image"
        :key="image?.sys.id"
        :preload="preload"
        :blok="image"
      />
    </template>
  </div>
  <div class="pointer-events-none absolute top-0 flex size-full p-5">
    <div class="flex h-full flex-col" :class="[...justify, ...align]">
      <h3
        v-if="blok?.fields.topline"
        class="text-sm font-bold md:text-md"
        :class="blok?.fields.isDark ? 'text-primary' : 'text-white'"
      >
        {{ blok?.fields.topline }}
      </h3>

      <h2
        v-if="blok?.fields.headline"
        class="text-[2rem] font-bold md:text-[2.5rem]"
        :class="blok?.fields.isDark ? 'text-primary' : 'text-white'"
      >
        {{ blok?.fields.headline }}
      </h2>

      <CMSContentfulLink
        v-if="blok?.fields.ctaUrl && blok?.fields.ctaLabel"
        :to="blok?.fields.ctaUrl"
        :raw="false"
        class="mt-10"
      >
        <button
          v-if="blok?.fields.ctaLabel"
          class="pointer-events-auto rounded px-6 py-3.5 text-sm font-bold"
          :class="
            blok?.fields.isDark
              ? 'bg-primary text-white'
              : 'bg-white text-primary'
          "
        >
          {{ blok?.fields.ctaLabel }}
        </button>
      </CMSContentfulLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Entry } from 'contentful'
import { useCMSAlignment } from '../composables/useCMSAlignment'
import { isTypeImage, isTypeVideo } from '../types/gen/index'
import type {
  CMSSlideProps,
  TypeImageSkeleton,
  TypeVideoSkeleton,
} from '../types'
import CMSContentfulLink from './ContentfulLink.vue'

const { blok, preload = false } = defineProps<CMSSlideProps>()

const { justify, align } = useCMSAlignment({
  align: blok?.fields.align,
  justify: blok?.fields.justify,
})

function getSlideComponent(
  file:
    | Entry<
        TypeImageSkeleton | TypeVideoSkeleton,
        'WITHOUT_UNRESOLVABLE_LINKS',
        string
      >
    | undefined,
) {
  if (!file) {
    return 'div'
  }
  if (isTypeImage(file)) {
    return 'CMSImage'
  }
  if (isTypeVideo(file)) {
    return 'CMSVideo'
  }
}

defineOptions({ name: 'CMSSlide' })
</script>
