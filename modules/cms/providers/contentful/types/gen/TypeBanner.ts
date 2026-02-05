import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeBannerLinkSkeleton } from './TypeBannerLink'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeBannerFields {
  uid?: EntryFieldTypes.Symbol
  isActive?: EntryFieldTypes.Boolean
  type?: EntryFieldTypes.Symbol<'hightlight' | 'info' | 'sale'>
  body?: EntryFieldTypes.RichText
  countdownUntil?: EntryFieldTypes.Date
  links?: EntryFieldTypes.EntryLink<TypeBannerLinkSkeleton>
  ctaUrl?: EntryFieldTypes.Symbol
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
}

export type TypeBannerSkeleton = EntrySkeletonType<TypeBannerFields, 'banner'>
export type TypeBanner<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBannerSkeleton, Modifiers, Locales>

export function isTypeBanner<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeBanner<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'banner'
}

export type TypeBannerWithoutLinkResolutionResponse = TypeBanner<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeBannerWithoutUnresolvableLinksResponse = TypeBanner<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeBannerWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBanner<'WITH_ALL_LOCALES', Locales>
export type TypeBannerWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBanner<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeBannerWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeBanner<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
