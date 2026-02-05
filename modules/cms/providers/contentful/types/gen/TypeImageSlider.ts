import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeImageSliderSlideSkeleton } from './TypeImageSliderSlide'
import type { TypeMarginSkeleton } from './TypeMargin'

export interface TypeImageSliderFields {
  uid?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  ctaLabel?: EntryFieldTypes.Symbol
  ctaUrl?: EntryFieldTypes.Symbol
  slides?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeImageSliderSlideSkeleton>
  >
  margin?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeImageSliderSkeleton = EntrySkeletonType<
  TypeImageSliderFields,
  'imageSlider'
>
export type TypeImageSlider<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeImageSliderSkeleton, Modifiers, Locales>

export function isTypeImageSlider<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeImageSlider<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'imageSlider'
}

export type TypeImageSliderWithoutLinkResolutionResponse = TypeImageSlider<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeImageSliderWithoutUnresolvableLinksResponse = TypeImageSlider<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeImageSliderWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSlider<'WITH_ALL_LOCALES', Locales>
export type TypeImageSliderWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSlider<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeImageSliderWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageSlider<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
