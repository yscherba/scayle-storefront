<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="relative overflow-hidden bg-[#a6a6a6]"
  >
    <NuxtImg
      v-if="imageSource && imageSource.src"
      class="size-full object-cover"
      provider="storyblok"
      :sizes="sizes"
      :src="imageSource.src"
      :alt="imageSource.alt"
    />

    <div
      class="absolute top-0 flex size-full overflow-hidden p-5 text-white xl:p-14"
    >
      <div
        class="flex h-full flex-col overflow-hidden"
        :class="[...align, ...justify]"
      >
        <div
          v-if="blok.topline"
          class="text-sm font-semibold leading-loose md:text-md"
        >
          {{ blok.topline }}
        </div>
        <SFHeadline
          v-if="blok.headline"
          is-uppercase
          class="!block leading-tight md:text-3xl"
        >
          {{ blok.headline }}
        </SFHeadline>
        <p
          v-if="blok.text"
          class="mt-3 overflow-auto text-sm scrollbar-hide md:pt-5"
        >
          {{ blok.text }}
        </p>
        <SFButton v-if="resolvedLink" class="mt-10 shrink-0" :to="resolvedLink">
          {{ blok.cta }}
        </SFButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCMSAlignment } from '../composables/useCMSAlignment'
import type { CMSImageTextProps } from '../types'
import { useStoryblokImageSanitizer } from '../composables/useStoryblokImage'
import { useLocalizedRoute } from '../../../composables/storefront/useLocalizedRoute'
import { NuxtImg } from '#components'
import { SFHeadline, SFButton } from '#storefront-ui/components'

const { blok, sizes = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw' } =
  defineProps<CMSImageTextProps>()

const { getLocalizedRoute } = useLocalizedRoute()

const { sanitize } = useStoryblokImageSanitizer()

const imageSource = computed(() => {
  if (!blok?.image?.[0]) {
    return
  }
  return sanitize(blok.image[0])
})

const { align, justify } = useCMSAlignment(blok)

const resolvedLink = computed(() => {
  const url = blok.cta_link?.cached_url
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
