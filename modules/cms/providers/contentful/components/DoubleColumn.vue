<template>
  <div>
    <div :class="marginClasses">
      <div class="grid justify-items-start md:grid md:grid-cols-2">
        <div class="w-full">
          <component
            :is="
              getComponentName(leftColumn?.sys.contentType.sys.id) ??
              'CMSAccordionEntry'
            "
            v-for="leftColumn in blok?.fields.columnLeft"
            :key="leftColumn?.fields.uid"
            :blok="leftColumn"
          />
        </div>
        <div class="w-full">
          <component
            :is="
              getComponentName(rightColumn?.sys.contentType.sys.id) ??
              'CMSAccordionEntry'
            "
            v-for="rightColumn in blok?.fields.columnRight"
            :key="rightColumn?.fields.uid"
            :blok="rightColumn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getComponentName } from '../../../utils/helpers'
import type { CMSDoubleColumnProps } from '../types'
import { useContentfulMargins } from '../composables/useContentfulMargins'

const { blok } = defineProps<CMSDoubleColumnProps>()

const { marginClasses } = useContentfulMargins(blok?.fields.marginTop)

defineOptions({ name: 'CMSDoubleColumn' })
</script>
