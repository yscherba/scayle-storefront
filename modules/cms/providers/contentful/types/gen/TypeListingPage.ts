import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeSeoSkeleton } from './TypeSeo'

export interface TypeListingPageFields {
  uid?: EntryFieldTypes.Symbol
  slug: EntryFieldTypes.Symbol
  teaserImage?: EntryFieldTypes.AssetLink
  teaserImageMobile?: EntryFieldTypes.AssetLink
  seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>
}

export type TypeListingPageSkeleton = EntrySkeletonType<
  TypeListingPageFields,
  'listingPage'
>
export type TypeListingPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeListingPageSkeleton, Modifiers, Locales>

export function isTypeListingPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeListingPage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'listingPage'
}

export type TypeListingPageWithoutLinkResolutionResponse = TypeListingPage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeListingPageWithoutUnresolvableLinksResponse = TypeListingPage<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeListingPageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeListingPage<'WITH_ALL_LOCALES', Locales>
export type TypeListingPageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeListingPage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeListingPageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeListingPage<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
