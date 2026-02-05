import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeClickableImageSkeleton } from './TypeClickableImage'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeProductSkeleton } from './TypeProduct'
import type { TypeShopableImageSkeleton } from './TypeShopableImage'
import type { TypeVideoSkeleton } from './TypeVideo'

export interface TypeGridTileFields {
  uid?: EntryFieldTypes.Symbol
  content: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<
      | TypeClickableImageSkeleton
      | TypeImageSkeleton
      | TypeProductSkeleton
      | TypeShopableImageSkeleton
      | TypeVideoSkeleton
    >
  >
  headline?: EntryFieldTypes.Symbol
  cta?: EntryFieldTypes.Symbol
  ctaLink?: EntryFieldTypes.Symbol
}

export type TypeGridTileSkeleton = EntrySkeletonType<
  TypeGridTileFields,
  'gridTile'
>
export type TypeGridTile<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeGridTileSkeleton, Modifiers, Locales>

export function isTypeGridTile<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeGridTile<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'gridTile'
}

export type TypeGridTileWithoutLinkResolutionResponse = TypeGridTile<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeGridTileWithoutUnresolvableLinksResponse = TypeGridTile<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeGridTileWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGridTile<'WITH_ALL_LOCALES', Locales>
export type TypeGridTileWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGridTile<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeGridTileWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeGridTile<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
