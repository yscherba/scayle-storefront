import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeDetailImageSkeleton } from './TypeDetailImage'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeMarginSkeleton } from './TypeMargin'

export interface TypeShopableImageFields {
  uid?: EntryFieldTypes.Symbol
  image?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeImageSkeleton>>
  detailImage?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeDetailImageSkeleton>
  >
  title?: EntryFieldTypes.Symbol
  productIds?: EntryFieldTypes.Symbol
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeShopableImageSkeleton = EntrySkeletonType<
  TypeShopableImageFields,
  'shopableImage'
>
export type TypeShopableImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeShopableImageSkeleton, Modifiers, Locales>

export function isTypeShopableImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeShopableImage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'shopableImage'
}

export type TypeShopableImageWithoutLinkResolutionResponse = TypeShopableImage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeShopableImageWithoutUnresolvableLinksResponse =
  TypeShopableImage<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeShopableImageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeShopableImage<'WITH_ALL_LOCALES', Locales>
export type TypeShopableImageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeShopableImage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeShopableImageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeShopableImage<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
