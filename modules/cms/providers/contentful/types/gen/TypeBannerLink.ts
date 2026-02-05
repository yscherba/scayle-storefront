import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeBannerLinkFields {
  uid?: EntryFieldTypes.Symbol
  label?: EntryFieldTypes.Symbol
  ctaUrl?: EntryFieldTypes.Symbol
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
}

export type TypeBannerLinkSkeleton = EntrySkeletonType<
  TypeBannerLinkFields,
  'bannerLink'
>
export type TypeBannerLink<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBannerLinkSkeleton, Modifiers, Locales>

export function isTypeBannerLink<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeBannerLink<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'bannerLink'
}

export type TypeBannerLinkWithoutLinkResolutionResponse = TypeBannerLink<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeBannerLinkWithoutUnresolvableLinksResponse = TypeBannerLink<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeBannerLinkWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBannerLink<'WITH_ALL_LOCALES', Locales>
export type TypeBannerLinkWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBannerLink<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeBannerLinkWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBannerLink<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
