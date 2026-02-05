import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeProductFields {
  uid?: EntryFieldTypes.Symbol
  productId?: EntryFieldTypes.Symbol
}

export type TypeProductSkeleton = EntrySkeletonType<
  TypeProductFields,
  'product'
>
export type TypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeProductSkeleton, Modifiers, Locales>

export function isTypeProduct<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeProduct<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'product'
}

export type TypeProductWithoutLinkResolutionResponse = TypeProduct<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeProductWithoutUnresolvableLinksResponse = TypeProduct<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeProductWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<'WITH_ALL_LOCALES', Locales>
export type TypeProductWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeProductWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeProduct<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
