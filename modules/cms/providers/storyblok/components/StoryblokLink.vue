<template>
  <SFLink
    v-if="!isInEditorMode"
    :raw="raw"
    :to="getLocalizedRoute(to)"
    :target="target"
  >
    <slot />
  </SFLink>
  <div v-else :to="to">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { CMSStoryblokLink } from '../types'
import { useStoryblokHelpers } from '../composables/useStoryblokHelpers'
import { useLocalizedRoute } from '../../../composables/storefront/useLocalizedRoute'
import { SFLink } from '#storefront-ui/components'

const { to, target = '_self', raw = true } = defineProps<CMSStoryblokLink>()

const { isInEditorMode } = useStoryblokHelpers()

const { getLocalizedRoute } = useLocalizedRoute()

defineOptions({ name: 'CMSStoryblokLink' })
</script>
