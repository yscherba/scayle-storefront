import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'
import type { TypeAccordionSkeleton } from './TypeAccordion'
import type { TypeCmsTextSkeleton } from './TypeCmsText'
import type { TypeDoubleColumnSkeleton } from './TypeDoubleColumn'
import type { TypeGridSkeleton } from './TypeGrid'
import type { TypeImageSkeleton } from './TypeImage'
import type { TypeImageSliderSkeleton } from './TypeImageSlider'
import type { TypeNestedParagraphSkeleton } from './TypeNestedParagraph'
import type { TypeParagraphSkeleton } from './TypeParagraph'
import type { TypeProductSliderSkeleton } from './TypeProductSlider'
import type { TypeSeoSkeleton } from './TypeSeo'
import type { TypeSlideShowSkeleton } from './TypeSlideShow'
import type { TypeVideoSkeleton } from './TypeVideo'

export interface TypeContentPageFields {
  uid?: EntryFieldTypes.Symbol
  slug: EntryFieldTypes.Symbol
  teaserImage?: EntryFieldTypes.AssetLink
  teaserImageMobile?: EntryFieldTypes.AssetLink
  headline?: EntryFieldTypes.Symbol
  subline?: EntryFieldTypes.Symbol
  content?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<
      | TypeAccordionSkeleton
      | TypeCmsTextSkeleton
      | TypeDoubleColumnSkeleton
      | TypeGridSkeleton
      | TypeImageSkeleton
      | TypeImageSliderSkeleton
      | TypeNestedParagraphSkeleton
      | TypeParagraphSkeleton
      | TypeProductSliderSkeleton
      | TypeSlideShowSkeleton
      | TypeVideoSkeleton
    >
  >
  seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>
}

export type TypeContentPageSkeleton = EntrySkeletonType<
  TypeContentPageFields,
  'contentPage'
>
export type TypeContentPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeContentPageSkeleton, Modifiers, Locales>

export function isTypeContentPage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeContentPage<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === 'contentPage'
}

export type TypeContentPageWithoutLinkResolutionResponse = TypeContentPage<
  'WITHOUT_LINK_RESOLUTION',
  LocaleCode
>
export type TypeContentPageWithoutUnresolvableLinksResponse = TypeContentPage<
  'WITHOUT_UNRESOLVABLE_LINKS',
  LocaleCode
>
export type TypeContentPageWithAllLocalesResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeContentPage<'WITH_ALL_LOCALES', Locales>
export type TypeContentPageWithAllLocalesAndWithoutLinkResolutionResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeContentPage<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', Locales>
export type TypeContentPageWithAllLocalesAndWithoutUnresolvableLinksResponse<
  Locales extends LocaleCode = LocaleCode,
> = TypeContentPage<'WITHOUT_UNRESOLVABLE_LINKS' | 'WITH_ALL_LOCALES', Locales>
