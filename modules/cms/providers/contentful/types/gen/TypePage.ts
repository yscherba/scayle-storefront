import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeSeoSkeleton } from './TypeSeo'

export interface TypePageFields {
  uid?: EntryFieldTypes.Symbol
  slug: EntryFieldTypes.Symbol
  teaserImage?: EntryFieldTypes.AssetLink
  teaserImageMobile?: EntryFieldTypes.AssetLink
  content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, 'page'>
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>

export function isTypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypePage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'page'
}

export type TypePageWithoutLinkResolutionResponse = TypePage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypePageWithoutUnresolvableLinksResponse = TypePage<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypePageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<'WITH_ALL_LOCALES', Locales>
export type TypePageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypePageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypePage<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
