<template>
  <div>
    <div v-editable="blok" :class="marginClasses">
      <div class="grid justify-items-start md:grid md:grid-cols-2">
        <div class="w-full">
          <component
            :is="getComponentName(leftColumn.component)"
            v-for="leftColumn in blok.column_left"
            :key="leftColumn._uid"
            :blok="leftColumn"
          />
        </div>
        <div class="w-full">
          <component
            :is="getComponentName(rightColumn.component)"
            v-for="rightColumn in blok.column_right"
            :key="rightColumn._uid"
            :blok="rightColumn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CMSDoubleColumnProps } from '../types'
import { getComponentName } from '../../../utils/helpers'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'

const { blok } = defineProps<CMSDoubleColumnProps>()

const { marginClasses } = useStoryblokMargins(blok)
</script>
