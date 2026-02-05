import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeTitleFields {
  uid?: EntryFieldTypes.Symbol
  text?: EntryFieldTypes.Symbol
  image?: EntryFieldTypes.AssetLink
}

export type TypeTitleSkeleton = EntrySkeletonType<TypeTitleFields, 'title'>
export type TypeTitle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTitleSkeleton, Modifiers, Locales>

export function isTypeTitle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeTitle<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'title'
}

export type TypeTitleWithoutLinkResolutionResponse = TypeTitle<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeTitleWithoutUnresolvableLinksResponse = TypeTitle<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeTitleWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTitle<'WITH_ALL_LOCALES', Locales>
export type TypeTitleWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTitle<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeTitleWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTitle<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
