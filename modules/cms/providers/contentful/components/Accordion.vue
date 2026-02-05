<template>
  <div v-if="blok">
    <div v-if="blok?.fields.hasLinkList" class="max-w-lg">
      <ul class="grid grid-cols-2 justify-items-start">
        <li
          v-for="b in blok.fields.entries"
          :key="b?.sys.id"
          class="my-1 font-bold"
        >
          <CMSContentfulLink to="#" class="inline-flex items-center">
            <IconDropdown class="my-1 mr-2 size-2.5" />
            {{ b?.fields.linkTitle }}
          </CMSContentfulLink>
        </li>
      </ul>
      <hr class="mt-8" />
    </div>
    <div class="divide-y divide-gray-400" :class="{ marginClasses }">
      <component
        :is="
          getComponentName(entry?.sys.contentType.sys.id) ?? 'CMSAccordionEntry'
        "
        v-for="entry in blok.fields.entries"
        :key="entry?.fields.uid"
        :blok="entry"
        :collapsed="collapseByAnchorSlug(entry?.fields.linkTitle ?? '')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CMSAccordionProps } from '../types'
import { getComponentName } from '../../../utils/helpers'
import { useContentfulMargins } from '../composables/useContentfulMargins'
import CMSContentfulLink from './ContentfulLink.vue'
import { useRoute } from '#app/composables/router'

const { blok } = defineProps<CMSAccordionProps>()

const route = useRoute()

const collapseByAnchorSlug = (linkTitle: string) => {
  const dashedTitle = linkTitle
    .split(/[\s_.-]+|(?=[A-Z][a-z])/)
    .join('-')
    .toLowerCase()
  return `#${dashedTitle}` !== route.hash
}

const { marginClasses } = useContentfulMargins(blok?.fields.marginTop)

defineOptions({ name: 'CMSAccordion' })
</script>
