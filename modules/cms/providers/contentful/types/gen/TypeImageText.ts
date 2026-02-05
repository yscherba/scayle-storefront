import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeImageSkeleton } from './TypeImage'

export interface TypeImageTextFields {
  uid?: EntryFieldTypes.Symbol
  image: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeImageSkeleton>>
  topline?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  text?: EntryFieldTypes.Text
  cta?: EntryFieldTypes.Symbol
  ctaLink?: EntryFieldTypes.Symbol
  align?: EntryFieldTypes.Symbol<'center' | 'end' | 'start'>
  justify?: EntryFieldTypes.Symbol<'center' | 'end' | 'start'>
}

export type TypeImageTextSkeleton = EntrySkeletonType<
  TypeImageTextFields,
  'imageText'
>
export type TypeImageText<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeImageTextSkeleton, Modifiers, Locales>

export function isTypeImageText<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeImageText<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'imageText'
}

export type TypeImageTextWithoutLinkResolutionResponse = TypeImageText<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeImageTextWithoutUnresolvableLinksResponse = TypeImageText<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeImageTextWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageText<'WITH_ALL_LOCALES', Locales>
export type TypeImageTextWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageText<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeImageTextWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeImageText<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
