import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeParagraphFields {
  uid?: EntryFieldTypes.Symbol
  headline?: EntryFieldTypes.Symbol
  cta?: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
  subTitle?: EntryFieldTypes.Text
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  anchorId?: EntryFieldTypes.Symbol
  backgroundColor?: EntryFieldTypes.Symbol
  fullWidth?: EntryFieldTypes.Boolean
}

export type TypeParagraphSkeleton = EntrySkeletonType<
  TypeParagraphFields,
  'paragraph'
>
export type TypeParagraph<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeParagraphSkeleton, Modifiers, Locales>

export function isTypeParagraph<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeParagraph<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'paragraph'
}

export type TypeParagraphWithoutLinkResolutionResponse = TypeParagraph<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeParagraphWithoutUnresolvableLinksResponse = TypeParagraph<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeParagraphWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeParagraph<'WITH_ALL_LOCALES', Locales>
export type TypeParagraphWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeParagraph<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeParagraphWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeParagraph<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
