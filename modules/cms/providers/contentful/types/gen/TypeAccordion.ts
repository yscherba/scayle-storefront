import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeAccordionEntrySkeleton } from './TypeAccordionEntry'
import type { TypeMarginSkeleton } from './TypeMargin'

export interface TypeAccordionFields {
  uid?: EntryFieldTypes.Symbol
  hasLinkList?: EntryFieldTypes.Boolean
  entries?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeAccordionEntrySkeleton>
  >
  marginTop?: EntryFieldTypes.EntryLink<TypeMarginSkeleton>
}

export type TypeAccordionSkeleton = EntrySkeletonType<
  TypeAccordionFields,
  'accordion'
>
export type TypeAccordion<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeAccordionSkeleton, Modifiers, Locales>

export function isTypeAccordion<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeAccordion<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'accordion'
}

export type TypeAccordionWithoutLinkResolutionResponse = TypeAccordion<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeAccordionWithoutUnresolvableLinksResponse = TypeAccordion<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeAccordionWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordion<'WITH_ALL_LOCALES', Locales>
export type TypeAccordionWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordion<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeAccordionWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeAccordion<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
