import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface TypeTrackingFields {
  item_id?: EntryFieldTypes.Symbol
  item_name?: EntryFieldTypes.Symbol
  promotion_id?: EntryFieldTypes.Symbol
  promotion_name?: EntryFieldTypes.Symbol
  creative_name?: EntryFieldTypes.Symbol
  creative_slot?: EntryFieldTypes.Symbol
  location_id?: EntryFieldTypes.Symbol
  index?: EntryFieldTypes.Symbol
}

export type TypeTrackingSkeleton = EntrySkeletonType<
  TypeTrackingFields,
  'tracking'
>
export type TypeTracking<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTrackingSkeleton, Modifiers, Locales>

export function isTypeTracking<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeTracking<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'tracking'
}

export type TypeTrackingWithoutLinkResolutionResponse = TypeTracking<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeTrackingWithoutUnresolvableLinksResponse = TypeTracking<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeTrackingWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTracking<'WITH_ALL_LOCALES', Locales>
export type TypeTrackingWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTracking<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeTrackingWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeTracking<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
