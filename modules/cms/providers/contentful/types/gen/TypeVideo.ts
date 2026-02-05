import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeMarginSkeleton } from './TypeMargin'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeVideoFields {
  uid?: EntryFieldTypes.Symbol
  video: EntryFieldTypes.AssetLink
  preview_desktop_image?: EntryFieldTypes.AssetLink
  preview_mobile_image?: EntryFieldTypes.AssetLink
  loop?: EntryFieldTypes.Boolean
  control_color?: EntryFieldTypes.Symbol
  autoplay?: EntryFieldTypes.Boolean
  has_controls?: EntryFieldTypes.Boolean
  is_containered?: EntryFieldTypes.Boolean
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeVideoSkeleton = EntrySkeletonType<TypeVideoFields, 'video'>
export type TypeVideo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeVideoSkeleton, Modifiers, Locales>

export function isTypeVideo<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeVideo<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'video'
}

export type TypeVideoWithoutLinkResolutionResponse = TypeVideo<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeVideoWithoutUnresolvableLinksResponse = TypeVideo<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeVideoWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVideo<'WITH_ALL_LOCALES', Locales>
export type TypeVideoWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVideo<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeVideoWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeVideo<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
