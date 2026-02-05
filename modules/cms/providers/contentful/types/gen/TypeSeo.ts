import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeSeoFields {
  title?: EntryFieldTypes.Symbol
  description?: EntryFieldTypes.Text
  twitterTitle?: EntryFieldTypes.Symbol
  twitterDescription?: EntryFieldTypes.Text
  twitterImage?: EntryFieldTypes.AssetLink
  ogTitle?: EntryFieldTypes.Symbol
  ogImage?: EntryFieldTypes.AssetLink
  ogDescription?: EntryFieldTypes.Text
}

export type TypeSeoSkeleton = EntrySkeletonType<TypeSeoFields, 'seo'>
export type TypeSeo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSeoSkeleton, Modifiers, Locales>

export function isTypeSeo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeSeo<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'seo'
}

export type TypeSeoWithoutLinkResolutionResponse = TypeSeo<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeSeoWithoutUnresolvableLinksResponse = TypeSeo<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeSeoWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSeo<'WITH_ALL_LOCALES', Locales>
export type TypeSeoWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSeo<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeSeoWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSeo<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
