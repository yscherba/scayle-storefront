import type { Document } from '@contentful/rich-text-types'
import type * as Contentful from './gen'

export type BlokProps<T> = { blok: T | null }
export type CMSComponentProps<T, R> = T & R
export * from './gen'

export type MarginKey =
  | ''
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export interface Alignment {
  justify: 'start' | 'center' | 'end'
  align: 'start' | 'center' | 'end'
}

type AccordionProp =
  BlokProps<Contentful.TypeAccordionWithoutUnresolvableLinksResponse>
export type CMSAccordionProps = AccordionProp

type AccordionEntryProp =
  BlokProps<Contentful.TypeAccordionEntryWithoutUnresolvableLinksResponse>
export type CMSAccordionEntryProps = CMSComponentProps<
  AccordionEntryProp,
  {
    collapsed?: boolean
  }
>

type BannerProp =
  BlokProps<Contentful.TypeBannerWithoutUnresolvableLinksResponse>
export type CMSBannerProps = CMSComponentProps<
  BannerProp,
  {
    type?: 'info' | 'sale' | 'dark' | 'alert' | string
    publishedAt: string
  }
>

type BannerLinkProp =
  BlokProps<Contentful.TypeBannerLinkWithoutUnresolvableLinksResponse>
export type CMSBannerLinkProps = BannerLinkProp

export type CMSScrollableLinkProps = {
  links: CMSBannerLinkProps[]
  hasMarginTop?: boolean
  fullWidth?: boolean
}

type DetailImageProps =
  BlokProps<Contentful.TypeDetailImageWithoutUnresolvableLinksResponse>
export type CMSDetailImageProps = CMSComponentProps<
  DetailImageProps,
  {
    sizes?: string
  }
>

type GridProp = BlokProps<Contentful.TypeGridWithoutUnresolvableLinksResponse>
export type CMSGridProps = GridProp

type GridTileProp =
  BlokProps<Contentful.TypeGridTileWithoutUnresolvableLinksResponse>
export type CMSGridTile = CMSComponentProps<
  GridTileProp,
  {
    sizes?: string
  }
>

type ImageSliderProp =
  BlokProps<Contentful.TypeImageSliderWithoutUnresolvableLinksResponse>
export type CMSImageSliderProps = ImageSliderProp

type ImageTextProp =
  BlokProps<Contentful.TypeImageTextWithoutUnresolvableLinksResponse>
export type CMSImageText = CMSComponentProps<
  ImageTextProp,
  {
    sizes?: string
  }
>

export type CMSContentfulLink = {
  to: string | object
  openInNewTab?: boolean
  raw?: boolean
  target?: '_self' | '_blank' | '_parent' | '_top' | ''
}

type LinkTypeProp =
  BlokProps<Contentful.TypeLinkTypeWithoutUnresolvableLinksResponse>
export type CMSLinkTypeProps = LinkTypeProp

type DoubleColumnProp =
  BlokProps<Contentful.TypeDoubleColumnWithoutUnresolvableLinksResponse>
export type CMSDoubleColumnProps = DoubleColumnProp

type ProductSliderProp =
  BlokProps<Contentful.TypeProductSliderWithoutUnresolvableLinksResponse>
export type CMSProductSliderProps = ProductSliderProp

type PageProp = BlokProps<Contentful.TypePageWithoutUnresolvableLinksResponse>
export type CMSPageProps = PageProp

type SlideShowProp =
  BlokProps<Contentful.TypeSlideShowWithoutUnresolvableLinksResponse>
export type CMSSlideShowProps = SlideShowProp

type SlideProp = BlokProps<Contentful.TypeSlideWithoutUnresolvableLinksResponse>
export type CMSSlideProps = CMSComponentProps<
  SlideProp,
  {
    preload?: boolean
  }
>

type ParagraphProps =
  BlokProps<Contentful.TypeParagraphWithoutUnresolvableLinksResponse>
export type CMSParagraphProps = CMSComponentProps<
  ParagraphProps,
  {
    sizes?: string
  }
>

type NestedParagraphProps =
  BlokProps<Contentful.TypeNestedParagraphWithoutUnresolvableLinksResponse>
export type CMSNestedParagraphProps = CMSComponentProps<
  NestedParagraphProps,
  {
    sizes?: string
  }
>

type TextProps = BlokProps<Document>
export type CMSTextProps = CMSComponentProps<
  TextProps,
  {
    noMarginTop?: boolean
  }
>

export type CMSSEO = Contentful.TypeSeoWithoutUnresolvableLinksResponse

type ImageProp = BlokProps<
  Contentful.TypeImageWithoutUnresolvableLinksResponse | AssetFile
>
export type CMSImageProps = CMSComponentProps<
  ImageProp,
  {
    _uid?: string
    sizes?: string
    preload?: boolean
    isTeaser?: boolean
    isCover?: boolean
  }
>

type VideoProp = BlokProps<Contentful.TypeVideoWithoutUnresolvableLinksResponse>
export type CMSVideoProps = VideoProp
type RequiredProperty<T> = { [P in keyof T]: Required<NonNullable<T[P]>> }

type ContentPageProp = BlokProps<
  RequiredProperty<Contentful.TypeContentPageWithoutUnresolvableLinksResponse>
>
export type CMSContentPageProps = ContentPageProp

type ClickableImageProps =
  BlokProps<Contentful.TypeClickableImageWithoutUnresolvableLinksResponse>
export type CMSClickableImageProps = CMSComponentProps<
  ClickableImageProps,
  {
    sizes?: string
  }
>

type ImageSliderSlideProps =
  BlokProps<Contentful.TypeImageSliderSlideWithoutUnresolvableLinksResponse>
export type CMSImageSliderSlideProps = CMSComponentProps<
  ImageSliderSlideProps,
  {
    sizes?: string
  }
>

type ListingPage =
  BlokProps<Contentful.TypeListingPageWithoutUnresolvableLinksResponse>
export type CMSListingPage = ListingPage

export type EntryWithSEO =
  | Contentful.TypeContentPageWithoutUnresolvableLinksResponse
  | Contentful.TypeListingPageWithoutUnresolvableLinksResponse
  | Contentful.TypePageWithoutUnresolvableLinksResponse
  | Contentful.TypeStorePageWithoutUnresolvableLinksResponse
  | Contentful.TypeStoreWithoutUnresolvableLinksResponse

export type EntryWithSEOSkeleton =
  | Contentful.TypeContentPageSkeleton
  | Contentful.TypeListingPageSkeleton
  | Contentful.TypePageSkeleton
  | Contentful.TypeStorePageSkeleton
  | Contentful.TypeStoreSkeleton

export type EntryWithSEOPage =
  | Contentful.TypeContentPage
  | Contentful.TypeListingPage
  | Contentful.TypePage
  | Contentful.TypeStorePage
  | Contentful.TypeStore
