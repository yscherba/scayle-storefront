import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeTrackingSkeleton } from './TypeTracking'

export interface TypeImageSliderSlideFields {
  uid?: EntryFieldTypes.Symbol
  image: EntryFieldTypes.AssetLink
  topline?: EntryFieldTypes.Symbol
  headline: EntryFieldTypes.Symbol
  isNew?: EntryFieldTypes.Boolean
  ctaLabel: EntryFieldTypes.Symbol
  ctaUrl: EntryFieldTypes.Symbol
  tracking?: EntryFieldTypes.EntryLink<TypeTrackingSkeleton>
}

export type TypeImageSliderSlideSkeleton = EntrySkeletonType<
  TypeImageSliderSlideFields,
  'imageSliderSlide'
>
export type TypeImageSliderSlide<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeImageSliderSlideSkeleton, Modifiers, Locales>

export function isTypeImageSliderSlide<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeImageSliderSlide<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'imageSliderSlide'
}

export type TypeImageSliderSlideWithoutLinkResolutionResponse =
  TypeImageSliderSlide<'WITHOUT_LINK_RESOLUTION', LocaleCode>
export type TypeImageSliderSlideWithoutUnresolvableLinksResponse =
  TypeImageSliderSlide<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeImageSliderSlideWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSliderSlide<'WITH_ALL_LOCALES', Locales>
export type TypeImageSliderSlideWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSliderSlide<
  'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES',
  Locales
>
export type TypeImageSliderSlideWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSliderSlide<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
