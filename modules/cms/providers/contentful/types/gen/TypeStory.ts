import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeStoryFields {
  uid?: EntryFieldTypes.Symbol
  slug?: EntryFieldTypes.Symbol
  color?: EntryFieldTypes.Symbol
  image?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  label?: EntryFieldTypes.Symbol
  ctaUrl?: EntryFieldTypes.Symbol
}

export type TypeStorySkeleton = EntrySkeletonType<TypeStoryFields, 'story'>
export type TypeStory<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeStorySkeleton, Modifiers, Locales>

export function isTypeStory<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeStory<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'story'
}

export type TypeStoryWithoutLinkResolutionResponse = TypeStory<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeStoryWithoutUnresolvableLinksResponse = TypeStory<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeStoryWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStory<'WITH_ALL_LOCALES', Locales>
export type TypeStoryWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStory<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeStoryWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeStory<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
