import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeMarginFields {
  marginTop?: EntryFieldTypes.Symbol<
    '2xl' | '3xl' | '4xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs'
  >
}

export type TypeMarginSkeleton = EntrySkeletonType<TypeMarginFields, 'margin'>
export type TypeMargin<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeMarginSkeleton, Modifiers, Locales>

export function isTypeMargin<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeMargin<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'margin'
}

export type TypeMarginWithoutLinkResolutionResponse = TypeMargin<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeMarginWithoutUnresolvableLinksResponse = TypeMargin<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeMarginWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeMargin<'WITH_ALL_LOCALES', Locales>
export type TypeMarginWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeMargin<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeMarginWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeMargin<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
