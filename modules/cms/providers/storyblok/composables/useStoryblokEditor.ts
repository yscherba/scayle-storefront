import { useStoryblokBridge } from '@storyblok/vue'
import type { Ref } from 'vue'
import type { SbStory } from '../types/storyblok'
import { useRoute } from '#app/composables/router'

export function useStoryblokEditor<T>(
  content?: Ref<SbStory<T> | null | undefined>,
) {
  const route = useRoute()
  const isInEditorMode = '_storyblok' in route.query

  if (isInEditorMode && content?.value && import.meta.client) {
    useStoryblokBridge(content.value.data.story.id, (evStory) => {
      if (content.value?.data.story) {
        content.value.data.story = evStory
      }
    })
  }

  return {
    isInEditorMode,
  }
}
