import { computed } from 'vue'
import { useRoute } from '#app/composables/router'

export function useStoryblokHelpers() {
  const route = useRoute()

  const isInEditorMode = computed(() => Boolean('_storyblok' in route.query))

  // NOTE: Not runtime-safe
  const getContentVersion = () => {
    const environment = process.env.NODE_ENV
    const isAllowedDraft = ['staging', 'integration', 'development']
    if (environment && isAllowedDraft.includes(environment)) {
      return isInEditorMode.value ? 'draft' : 'published'
    }
    return 'published'
  }

  return {
    isInEditorMode,
    getContentVersion,
  }
}
