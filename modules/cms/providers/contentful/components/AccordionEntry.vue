<template>
  <div v-if="blok">
    <button
      class="flex w-full justify-between py-8 text-3xl"
      @click.self="toggleCollapse"
    >
      {{ blok?.fields.title }}
    </button>
    <SFFadeInTransition>
      <div v-if="!isCollapsed">
        <CMSText v-if="blok.fields.body" :blok="blok.fields.body" />
      </div>
    </SFFadeInTransition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CMSAccordionEntryProps } from '../types'
import CMSText from './Text.vue'
import { SFFadeInTransition } from '#storefront-ui/components'

const { collapsed = false } = defineProps<CMSAccordionEntryProps>()

const isCollapsed = ref(collapsed)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

defineOptions({ name: 'CMSAccordionEntry' })
</script>
