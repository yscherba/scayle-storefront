<template>
  <div v-if="blok" class="relative overflow-hidden bg-[#a6a6a6]">
    <NuxtImg
      v-if="imageSource && imageSource.src"
      class="size-full object-cover"
      provider="contentful"
      :sizes="sizes"
      :src="imageSource.src"
      :alt="imageSource.alt"
    />

    <div
      class="absolute top-0 flex size-full overflow-hidden p-5 text-white md:p-[60px]"
    >
      <div
        class="flex h-full flex-col overflow-hidden"
        :class="[...align, ...justify]"
      >
        <div
          v-if="blok.fields.topline"
          class="text-sm font-semibold leading-loose md:text-md"
        >
          {{ blok.fields.topline }}
        </div>
        <SFHeadline
          v-if="blok.fields.headline"
          is-uppercase
          class="!block leading-tight md:text-[40px]"
        >
          {{ blok.fields.headline }}
        </SFHeadline>
        <p v-if="blok.fields.text" class="mt-3 overflow-auto text-sm md:pt-5">
          {{ blok.fields.text }}
        </p>
        <SFButton v-if="resolvedLink" class="mt-10 shrink-0" :to="resolvedLink">
          {{ blok.fields.cta }}
        </SFButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCMSAlignment } from '../composables/useCMSAlignment'
import type { CMSImageText } from '../types'
import { useContentfulImageSanitizer } from '../composables/useContentfulImage'
import { useLocalizedRoute } from '../../../composables/storefront/useLocalizedRoute'
import { NuxtImg } from '#components'
import { SFHeadline, SFButton } from '#storefront-ui/components'

const { blok, sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSImageText>()

const { sanitize } = useContentfulImageSanitizer()

const { getLocalizedRoute } = useLocalizedRoute()

const imageSource = computed(() => {
  if (!blok?.fields.image.length) {
    return
  }
  return sanitize(blok?.fields.image.at(0))
})

const { align, justify } = useCMSAlignment({
  align: blok?.fields.align,
  justify: blok?.fields.justify,
})

const resolvedLink = computed(() => {
  const url = blok?.fields?.ctaLink
  return url ? getLocalizedRoute(url) : null
})

defineOptions({ name: 'CMSImageText' })
</script>

<style lang="css" scoped>
.gradient {
  background-image: linear-gradient(
      to bottom,
      rgb(0 0 0 / 0.14),
      rgb(0 0 0 / 0.14)
    ),
    linear-gradient(to bottom, rgb(0 0 0 / 0.11), rgb(0 0 0 / 0));
}
</style>
