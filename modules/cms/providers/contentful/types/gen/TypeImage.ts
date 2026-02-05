import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeImageFields {
  uid?: EntryFieldTypes.Symbol
  desktopImage?: EntryFieldTypes.AssetLink
  mobileImage?: EntryFieldTypes.AssetLink
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
}

export type TypeImageSkeleton = EntrySkeletonType<TypeImageFields, 'image'>
export type TypeImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeImageSkeleton, Modifiers, Locales>

export function isTypeImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeImage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'image'
}

export type TypeImageWithoutLinkResolutionResponse = TypeImage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeImageWithoutUnresolvableLinksResponse = TypeImage<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeImageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImage<'WITH_ALL_LOCALES', Locales>
export type TypeImageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeImageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImage<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
