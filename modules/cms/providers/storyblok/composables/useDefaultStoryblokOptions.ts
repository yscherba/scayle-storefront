import type { ISbStoriesParams } from '@storyblok/vue'
import { useRoute } from '#app/composables/router'
import { useCurrentShop } from '#storefront/composables'

export function useDefaultStoryblokOptions(): Pick<
  ISbStoriesParams,
  'language' | 'version'
> {
  const route = useRoute()
  const currentShop = useCurrentShop()

  return {
    version: route.query._storyblok ? 'draft' : 'published',
    language: currentShop.value.locale ?? '',
  }
}
