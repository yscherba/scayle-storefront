import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeParagraphSkeleton } from './TypeParagraph'

export interface TypeNestedParagraphFields {
  uid?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  headlineTag?: EntryFieldTypes.Symbol<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
  anchorId?: EntryFieldTypes.Symbol
  cta?: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
  nestedItems?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<
      TypeNestedParagraphSkeleton | TypeParagraphSkeleton
    >
  >
  subTitle?: EntryFieldTypes.Text
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  backgroundColor?: EntryFieldTypes.Symbol
  fullWidth?: EntryFieldTypes.Boolean
}

export type TypeNestedParagraphSkeleton = EntrySkeletonType<
  TypeNestedParagraphFields,
  'nestedParagraph'
>
export type TypeNestedParagraph<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeNestedParagraphSkeleton, Modifiers, Locales>

export function isTypeNestedParagraph<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeNestedParagraph<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'nestedParagraph'
}

export type TypeNestedParagraphWithoutLinkResolutionResponse =
  TypeNestedParagraph<'WITHOUT_LINK_RESOLUTION', LocaleCode>
export type TypeNestedParagraphWithoutUnresolvableLinksResponse =
  TypeNestedParagraph<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeNestedParagraphWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeNestedParagraph<'WITH_ALL_LOCALES', Locales>
export type TypeNestedParagraphWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeNestedParagraph<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeNestedParagraphWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeNestedParagraph<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
