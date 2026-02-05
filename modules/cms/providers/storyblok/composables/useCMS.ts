import type { ISbStoriesParams } from '@storyblok/vue'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { useStoryblokApi } from '@storyblok/vue'
import type { SbStory } from '../types/storyblok'
import { useDefaultStoryblokOptions } from './useDefaultStoryblokOptions'
import { useAsyncData, type AsyncDataOptions } from '#app/composables/asyncData'

export function useCMSBySlug<T>(
  key: string,
  slug: MaybeRefOrGetter<string>,
  asyncDataOption?: AsyncDataOptions<SbStory<T>>,
) {
  const storyblokApi = useStoryblokApi()
  const storyblokOptions = useDefaultStoryblokOptions()
  return useAsyncData(
    key,
    () =>
      storyblokApi.get(`cdn/stories/${toValue(slug)}`, {
        ...storyblokOptions,
      }) as unknown as Promise<SbStory<T>>,
    {
      ...asyncDataOption,
      watch: [() => toValue(slug)],
    },
  )
}

export function useCMSByFolder<T>(
  key: string,
  folder: string,
  params?: ISbStoriesParams,
  asyncDataOption?: AsyncDataOptions<SbStory<T>>,
) {
  const storyblokApi = useStoryblokApi()
  const storyblokOptions = useDefaultStoryblokOptions()
  return useAsyncData(
    key,
    () => {
      return storyblokApi.getStories({
        ...storyblokOptions,
        starts_with: folder,
        ...params,
      }) as unknown as Promise<SbStory<T>>
    },
    asyncDataOption,
  )
}
