import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeDetailImageFields {
  uid?: EntryFieldTypes.Symbol
  image: EntryFieldTypes.AssetLink
  productIds?: EntryFieldTypes.Symbol
}

export type TypeDetailImageSkeleton = EntrySkeletonType<
  TypeDetailImageFields,
  'detailImage'
>
export type TypeDetailImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeDetailImageSkeleton, Modifiers, Locales>

export function isTypeDetailImage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeDetailImage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'detailImage'
}

export type TypeDetailImageWithoutLinkResolutionResponse = TypeDetailImage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeDetailImageWithoutUnresolvableLinksResponse = TypeDetailImage<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeDetailImageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDetailImage<'WITH_ALL_LOCALES', Locales>
export type TypeDetailImageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDetailImage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeDetailImageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeDetailImage<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
