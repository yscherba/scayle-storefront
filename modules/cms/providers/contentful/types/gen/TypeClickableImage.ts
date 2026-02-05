import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeMarginSkeleton } from './TypeMargin'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeClickableImageFields {
  uid?: EntryFieldTypes.Symbol
  image: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeImageSkeleton>>
  ctaUrl?: EntryFieldTypes.Symbol
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeClickableImageSkeleton = EntrySkeletonType<
  TypeClickableImageFields,
  'clickableImage'
>
export type TypeClickableImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeClickableImageSkeleton, Modifiers, Locales>

export function isTypeClickableImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeClickableImage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'clickableImage'
}

export type TypeClickableImageWithoutLinkResolutionResponse =
  TypeClickableImage<'WITHOUT_LINK_RESOLUTION', LocaleCode>
export type TypeClickableImageWithoutUnresolvableLinksResponse =
  TypeClickableImage<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeClickableImageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeClickableImage<'WITH_ALL_LOCALES', Locales>
export type TypeClickableImageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeClickableImage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeClickableImageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeClickableImage<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
