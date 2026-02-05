<template>
  <section
    v-editable="blok"
    class="grid auto-cols-fr py-0.5 md:grid-flow-col md:px-9 lg:px-4"
    :class="[
      marginClasses[0],
      {
        'lg:container': blok.is_containered_desktop,
        'max-md:container': blok.is_containered,
        'gap-0.5': blok.is_spaced,
      },
    ]"
  >
    <!-- Image is not allowed as a component so we have to rename it here -->
    <component
      :is="getComponentName(column.component) ?? 'div'"
      v-for="column in blok.columns"
      :key="column._uid"
      :blok="column"
      :sizes="sizes"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CMSGridProps } from '../types'
import { getComponentName } from '../../../utils/helpers'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'

const { blok } = defineProps<CMSGridProps>()

const { marginClasses } = useStoryblokMargins(blok)

const sizes = computed(() => {
  const vw = Math.ceil(100 / (blok?.columns?.length || 1))
  return `xs:100vw sm:100vw md:100vw lg:${vw}vw  xl:${vw}vw  xxl:${vw}vw 2xl:${vw}vw `
})

defineOptions({ name: 'CMSGrid' })
</script>
