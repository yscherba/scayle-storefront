import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeMarginSkeleton } from './TypeMargin'

export interface TypeProductSliderFields {
  uid?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  ctaLabel?: EntryFieldTypes.Symbol
  ctaUrl?: EntryFieldTypes.Symbol
  productIds?: EntryFieldTypes.Symbol
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeProductSliderSkeleton = EntrySkeletonType<
  TypeProductSliderFields,
  'productSlider'
>
export type TypeProductSlider<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductSliderSkeleton, Modifiers, Locales>

export function isTypeProductSlider<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeProductSlider<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'productSlider'
}

export type TypeProductSliderWithoutLinkResolutionResponse = TypeProductSlider<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeProductSliderWithoutUnresolvableLinksResponse =
  TypeProductSlider<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeProductSliderWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductSlider<'WITH_ALL_LOCALES', Locales>
export type TypeProductSliderWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductSlider<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeProductSliderWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProductSlider<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
