import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeCmsTextFields {
  uid?: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
}

export type TypeCmsTextSkeleton = EntrySkeletonType<
  TypeCmsTextFields,
  'cmsText'
>
export type TypeCmsText<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCmsTextSkeleton, Modifiers, Locales>

export function isTypeCmsText<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeCmsText<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'cmsText'
}

export type TypeCmsTextWithoutLinkResolutionResponse = TypeCmsText<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeCmsTextWithoutUnresolvableLinksResponse = TypeCmsText<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeCmsTextWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCmsText<'WITH_ALL_LOCALES', Locales>
export type TypeCmsTextWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCmsText<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeCmsTextWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeCmsText<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
