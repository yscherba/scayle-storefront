import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeLinkTypeSkeleton } from './TypeLinkType'

export interface TypeLinkGroupFields {
  uid?: EntryFieldTypes.Symbol
  title?: EntryFieldTypes.Symbol
  links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLinkTypeSkeleton>>
}

export type TypeLinkGroupSkeleton = EntrySkeletonType<
  TypeLinkGroupFields,
  'linkGroup'
>
export type TypeLinkGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeLinkGroupSkeleton, Modifiers, Locales>

export function isTypeLinkGroup<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeLinkGroup<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'linkGroup'
}

export type TypeLinkGroupWithoutLinkResolutionResponse = TypeLinkGroup<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeLinkGroupWithoutUnresolvableLinksResponse = TypeLinkGroup<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeLinkGroupWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkGroup<'WITH_ALL_LOCALES', Locales>
export type TypeLinkGroupWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkGroup<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeLinkGroupWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeLinkGroup<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
