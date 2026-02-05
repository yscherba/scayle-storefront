import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeClickableImageSkeleton } from './TypeClickableImage'
import type { TypeCmsTextSkeleton } from './TypeCmsText'
import type { TypeGridTileSkeleton } from './TypeGridTile'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeImageTextSkeleton } from './TypeImageText'
import type { TypeMarginSkeleton } from './TypeMargin'
import type { TypeParagraphSkeleton } from './TypeParagraph'
import type { TypeProductSkeleton } from './TypeProduct'
import type { TypeShopableImageSkeleton } from './TypeShopableImage'
import type { TypeVideoSkeleton } from './TypeVideo'

export interface TypeGridFields {
  uid?: EntryFieldTypes.Symbol
  columns?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<
      | TypeClickableImageSkeleton
      | TypeCmsTextSkeleton
      | TypeGridTileSkeleton
      | TypeImageSkeleton
      | TypeImageTextSkeleton
      | TypeParagraphSkeleton
      | TypeProductSkeleton
      | TypeShopableImageSkeleton
      | TypeVideoSkeleton
    >
  >
  isSpaced?: EntryFieldTypes.Boolean
  isContaineredDesktop?: EntryFieldTypes.Boolean
  isContainered?: EntryFieldTypes.Boolean
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeGridSkeleton = EntrySkeletonType<TypeGridFields, 'grid'>
export type TypeGrid<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeGridSkeleton, Modifiers, Locales>

export function isTypeGrid<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeGrid<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'grid'
}

export type TypeGridWithoutLinkResolutionResponse = TypeGrid<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeGridWithoutUnresolvableLinksResponse = TypeGrid<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeGridWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGrid<'WITH_ALL_LOCALES', Locales>
export type TypeGridWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGrid<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeGridWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGrid<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
