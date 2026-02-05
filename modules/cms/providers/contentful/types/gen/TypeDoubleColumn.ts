import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeMarginSkeleton } from './TypeMargin'

export interface TypeDoubleColumnFields {
  uid?: EntryFieldTypes.Symbol
  columnLeft?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
  columnRight?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeDoubleColumnSkeleton = EntrySkeletonType<
  TypeDoubleColumnFields,
  'doubleColumn'
>
export type TypeDoubleColumn<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeDoubleColumnSkeleton, Modifiers, Locales>

export function isTypeDoubleColumn<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeDoubleColumn<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'doubleColumn'
}

export type TypeDoubleColumnWithoutLinkResolutionResponse = TypeDoubleColumn<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeDoubleColumnWithoutUnresolvableLinksResponse = TypeDoubleColumn<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeDoubleColumnWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDoubleColumn<'WITH_ALL_LOCALES', Locales>
export type TypeDoubleColumnWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDoubleColumn<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeDoubleColumnWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDoubleColumn<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
