import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeVideoSkeleton } from './TypeVideo'

export interface TypeSlideFields {
  uid?: EntryFieldTypes.Symbol
  topline?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  ctaLabel?: EntryFieldTypes.Symbol
  ctaUrl?: EntryFieldTypes.Symbol
  align?: EntryFieldTypes.Symbol<'center' | 'end' | 'start'>
  justify?: EntryFieldTypes.Symbol<'center' | 'end' | 'start'>
  isDark?: EntryFieldTypes.Boolean
  image?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeImageSkeleton | TypeVideoSkeleton>
  >
}

export type TypeSlideSkeleton = EntrySkeletonType<TypeSlideFields, 'slide'>
export type TypeSlide<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSlideSkeleton, Modifiers, Locales>

export function isTypeSlide<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeSlide<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'slide'
}

export type TypeSlideWithoutLinkResolutionResponse = TypeSlide<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeSlideWithoutUnresolvableLinksResponse = TypeSlide<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeSlideWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlide<'WITH_ALL_LOCALES', Locales>
export type TypeSlideWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlide<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeSlideWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeSlide<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
