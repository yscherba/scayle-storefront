<template>
  <div v-editable="blok">
    <button
      class="flex w-full justify-between py-8 text-3xl"
      @click.self="isCollapsed = !isCollapsed"
    >
      {{ blok.title }}
    </button>
    <SFFadeInTransition>
      <div v-if="!isCollapsed">
        <CMSText :blok="{ ...blok, component: 'CmsText' }" />
      </div>
    </SFFadeInTransition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CMSAccordionEntryProps } from '../types'
import CMSText from './Text.vue'
import { SFFadeInTransition } from '#storefront-ui/components'

const { collapsed = true } = defineProps<CMSAccordionEntryProps>()

const isCollapsed = ref(collapsed)

defineOptions({ name: 'CMSAccordionEntry' })
</script>
