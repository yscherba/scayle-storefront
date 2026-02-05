import type {
  AddChainModifier,
  ChainModifiers,
  ContentfulClientApi,
  EntriesQueries,
  Entry,
  EntryCollection,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { useDefaultCMSOptions } from './useDefaultCMSOptions'
import { useContentful } from './useContentful'
import { useAsyncData, type AsyncDataOptions } from '#app/composables/asyncData'

export function useCMSBySlug<
  T extends EntrySkeletonType = EntrySkeletonType,
  Modifiers extends ChainModifiers = ChainModifiers,
  Locale extends LocaleCode = LocaleCode,
>(
  key: string,
  query?: MaybeRefOrGetter<EntriesQueries<T, Modifiers>>,
  asyncDataOption?: AsyncDataOptions<
    Entry<T, 'WITHOUT_UNRESOLVABLE_LINKS', Locale> | undefined
  >,
) {
  const defaultCMSOptions = useDefaultCMSOptions()
  const contentfulClient = useContentful() as unknown as ContentfulClientApi<
    AddChainModifier<ChainModifiers, 'WITHOUT_UNRESOLVABLE_LINKS'>
  >
  return useAsyncData(
    key,
    () =>
      contentfulClient
        .getEntries<T, Locale>({
          include: 10,
          limit: 1,
          ...defaultCMSOptions,
          ...toValue(query),
        })
        .then((data) => {
          return data.items.at(0)
        }),
    {
      ...asyncDataOption,
      watch: [() => toValue(query)],
    },
  )
}

export function useCMSByFolder<
  T extends EntrySkeletonType,
  Modifiers extends ChainModifiers =
    | 'WITH_ALL_LOCALES'
    | 'WITHOUT_LINK_RESOLUTION'
    | 'WITHOUT_UNRESOLVABLE_LINKS',
  Locale extends LocaleCode = LocaleCode,
>(
  key: string,
  folder: string,
  query: EntriesQueries<T, Modifiers>,
  asyncDataOption?: AsyncDataOptions<
    EntryCollection<T, ChainModifiers, Locale>,
    Entry<T, ChainModifiers, Locale>
  >,
) {
  const defaultCMSOptions = useDefaultCMSOptions()
  const contentfulClient = useContentful() as unknown as ContentfulClientApi<
    AddChainModifier<ChainModifiers, 'WITHOUT_UNRESOLVABLE_LINKS'>
  >
  return useAsyncData(
    key,
    () =>
      contentfulClient.getEntries<T, Locale>({
        include: 10,
        ...defaultCMSOptions,
        ...query,
      }) as unknown as Promise<EntryCollection<T, Modifiers, Locale>>,
    asyncDataOption,
  )
}
