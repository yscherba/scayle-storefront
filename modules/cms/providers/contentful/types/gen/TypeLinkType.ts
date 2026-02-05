import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeLinkTypeFields {
  uid?: EntryFieldTypes.Symbol
  label: EntryFieldTypes.Symbol
  ctaUrl: EntryFieldTypes.Symbol
  openInNewTab?: EntryFieldTypes.Boolean
}

export type TypeLinkTypeSkeleton = EntrySkeletonType<
  TypeLinkTypeFields,
  'linkType'
>
export type TypeLinkType<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeLinkTypeSkeleton, Modifiers, Locales>

export function isTypeLinkType<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeLinkType<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'linkType'
}

export type TypeLinkTypeWithoutLinkResolutionResponse = TypeLinkType<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeLinkTypeWithoutUnresolvableLinksResponse = TypeLinkType<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeLinkTypeWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkType<'WITH_ALL_LOCALES', Locales>
export type TypeLinkTypeWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkType<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeLinkTypeWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkType<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
