import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeMarginSkeleton } from './TypeMargin'
import type { TypeSlideSkeleton } from './TypeSlide'

export interface TypeSlideShowFields {
  uid?: EntryFieldTypes.Symbol
  slides?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSlideSkeleton>>
  h1?: EntryFieldTypes.Symbol
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeSlideShowSkeleton = EntrySkeletonType<
  TypeSlideShowFields,
  'slideShow'
>
export type TypeSlideShow<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSlideShowSkeleton, Modifiers, Locales>

export function isTypeSlideShow<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeSlideShow<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'slideShow'
}

export type TypeSlideShowWithoutLinkResolutionResponse = TypeSlideShow<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeSlideShowWithoutUnresolvableLinksResponse = TypeSlideShow<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeSlideShowWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlideShow<'WITH_ALL_LOCALES', Locales>
export type TypeSlideShowWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlideShow<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeSlideShowWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlideShow<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
