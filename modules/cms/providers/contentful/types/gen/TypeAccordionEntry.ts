import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeAccordionEntryFields {
  uid?: EntryFieldTypes.Symbol
  title?: EntryFieldTypes.Symbol
  linkTitle: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
}

export type TypeAccordionEntrySkeleton = EntrySkeletonType<
  TypeAccordionEntryFields,
  'accordionEntry'
>
export type TypeAccordionEntry<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAccordionEntrySkeleton, Modifiers, Locales>

export function isTypeAccordionEntry<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeAccordionEntry<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'accordionEntry'
}

export type TypeAccordionEntryWithoutLinkResolutionResponse =
  TypeAccordionEntry<'WITHOUT_LINK_RESOLUTION', LocaleCode>
export type TypeAccordionEntryWithoutUnresolvableLinksResponse =
  TypeAccordionEntry<'WITHOUT_UNRESOLVABLE_LINKS', LocaleCode>
export type TypeAccordionEntryWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordionEntry<'WITH_ALL_LOCALES', Locales>
export type TypeAccordionEntryWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordionEntry<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeAccordionEntryWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordionEntry<
  'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES',
  Locales
>
