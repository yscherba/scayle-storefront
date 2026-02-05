import type { ISbLinkURLObject, ISbStoryData } from '@storyblok/vue'
import type * as Storyblok from './storyblok.gen.d'
import type { RouteLocationRaw } from '#vue-router'

export type * from './storyblok.gen.d'
export type BlokProps<T> = { blok: T }
export type CMSComponentProps<T, R> = T & R
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

export interface StoryblokTrackingContent {
  _uid?: string
  item_id?: string
  item_name?: string
  promotion_id?: string
  promotion_name?: string
  creative_name?: string
  creative_slot?: string
  location_id?: string
  index?: string
}

export interface Margins {
  margin_top: MarginKey
}

export interface Alignment {
  justify: 'start' | 'center' | 'end'
  align: 'start' | 'center' | 'end'
}

// CLIENT TYPES

export interface StoryblokBridgeConfig {
  initOnlyOnce?: boolean
  accessToken?: string
}
export interface StoryblokEventPayload<
  S extends StoryblokComponent<string> = unknown,
> {
  action:
    | 'customEvent'
    | 'published'
    | 'input'
    | 'change'
    | 'unpublished'
    | 'enterEditmode'
  event?: string
  story?: S
  slug?: string
  slugChanged?: boolean
  storyId?: string
  reload?: boolean
}

export interface StoryblokBridge {
  init: (config?: StoryblokBridgeConfig) => void
  pingEditor: (callback: (instance: StoryblokBridge) => void) => void
  isInEditor: () => boolean
  enterEditmode: () => void
  on: (
    event:
      | 'customEvent'
      | 'published'
      | 'input'
      | 'change'
      | 'unpublished'
      | 'enterEditmode'
      | string[],
    callback: (payload?: StoryblokEventPayload) => void,
  ) => void
  addComments: (
    tree: StoryblokComponent<string>,
    storyId: string,
  ) => StoryblokComponent<string>
  resolveRelations: (
    story: unknown,
    resolve: string[],
    callback: (storyContent: unknown) => void,
  ) => void
}

export interface CmsFetchOptions {
  startsWith?: string
  perPage?: number
  language?: string
  version?: StoriesParams['version']
}

export type SbSeo = Partial<{
  _uid: string
  title: string
  plugin: string
  og_image: string
  og_title: string
  description: string
  twitter_image: string
  twitter_title: string
  og_description: string
  twitter_description: string
}>
export type CMSStoryProps<
  T extends
    | SbPage
    | SbListingPage
    | SbContentPage
    | SbStorePage
    | SbStore
    | SbFooter,
> = {
  story: ISbStoryData<T & { SEO: SbSeo }>
}

type AccordionProp = BlokProps<Storyblok.SbAccordion>
export type CMSAccordionProps = AccordionProp

type AccordionEntryProp = BlokProps<Storyblok.SbAccordionEntry>
export type CMSAccordionEntryProps = CMSComponentProps<
  AccordionEntryProp,
  {
    collapsed?: boolean
  }
>

type BannerProp = BlokProps<Storyblok.SbBanner>
export type CMSBannerProps = CMSComponentProps<
  BannerProp,
  {
    type?: 'info' | 'sale' | 'dark' | 'alert' | string
    publishedAt: string
  }
>

type BannerLinkProp = BlokProps<Storyblok.SbBannerLink>
export type CMSBannerLinkProps = BannerLinkProp

export type CMSScrollableLinkProps = {
  links: Storyblok.SbBannerLink[]
  hasMarginTop?: boolean
  fullWidth?: boolean
}

type DetailImageProps = BlokProps<Storyblok.SbDetailImage>
export type CMSDetailImageProps = CMSComponentProps<
  DetailImageProps,
  {
    sizes?: string
  }
>

type GridProp = BlokProps<Storyblok.SbGrid>
export type CMSGridProps = GridProp

type GridTileProp = BlokProps<Storyblok.SbGridTile>
export type CMSGridTileProps = CMSComponentProps<
  GridTileProp,
  {
    sizes?: string
  }
>

type ImageSliderProp = BlokProps<Storyblok.SbImageSlider>
export type CMSImageSliderProps = ImageSliderProp

type ImageTextProp = BlokProps<Storyblok.SbImageText>
export type CMSImageTextProps = CMSComponentProps<
  ImageTextProp,
  {
    sizes?: string
  }
>

export type CMSStoryblokLink = {
  to: RouteLocationRaw
  openInNewTab?: boolean
  raw?: boolean
  target?: '_self' | '_blank' | '_parent' | '_top'
}

type LinkTypeProp = BlokProps<Storyblok.SbLink>
export type CMSLinkTypeProps = LinkTypeProp

type DoubleColumnProp = BlokProps<Storyblok.SbDoubleColumn>
export type CMSDoubleColumnProps = DoubleColumnProp

export type SbProductSliderWithProducts = Storyblok.SbProductSlider & {
  products?: {
    id?: string
    referenceKey?: string
    name?: string
    imageUrl?: string
  }[]
}

type ProductSliderProp = BlokProps<SbProductSliderWithProducts>
export type CMSProductSliderProps = ProductSliderProp

type PageProp = BlokProps<Storyblok.SbPage>
export type CMSPageProps = PageProp

type SlideShowProp = BlokProps<Storyblok.SbSlideShow>
export type CMSSlideShowProps = SlideShowProp

type SlideProp = BlokProps<Storyblok.SbSlide>
export type CMSSlideProps = CMSComponentProps<
  SlideProp,
  {
    preload?: boolean
  }
>

type ParagraphProps = BlokProps<Storyblok.SbParagraph>
export type CMSParagraphProps = CMSComponentProps<
  ParagraphProps,
  {
    sizes?: string
  }
>

type TextProps = BlokProps<Storyblok.SbCmsText>
export type CMSTextProps = CMSComponentProps<
  TextProps,
  {
    noMarginTop?: boolean
  }
>

export type CMSSEO = Storyblok.TypeSeoWithoutUnresolvableLinksResponse

// type ImageFields = Omit<Storyblok.TypeImageWithoutUnresolvableLinksResponse, 'uid' | 'tracking'>
type ImageProp = BlokProps<Storyblok.SbCmsImage>
export type CMSImageProps = CMSComponentProps<
  ImageProp,
  {
    sizes?: string
    preload?: boolean
    isTeaser?: boolean
    isCover?: boolean
  }
>

type VideoProp = BlokProps<Storyblok.SbVideo>
export type CMSVideoProps = VideoProp
type RequiredProperty<T> = { [P in keyof T]: Required<NonNullable<T[P]>> }

type ContentPageProp = BlokProps<RequiredProperty<Storyblok.SbContentPage>>
export type CMSContentPageProps = ContentPageProp

type ClickableImageProps = BlokProps<Storyblok.SbClickableImage>
export type CMSClickableImageProps = CMSComponentProps<
  ClickableImageProps,
  {
    sizes?: string
  }
>

type ImageSliderSlideProps = BlokProps<Storyblok.SbImageSliderSlide>
export type CMSImageSliderSlideProps = CMSComponentProps<
  ImageSliderSlideProps,
  {
    sizes?: string
  }
>

type ListingPage = BlokProps<Storyblok.SbListingPage>
export type CMSListingPage = ListingPage

export type EntryWithSEO =
  | Storyblok.TypeContentPageWithoutUnresolvableLinksResponse
  | Storyblok.TypeListingPageWithoutUnresolvableLinksResponse
  | Storyblok.TypePageWithoutUnresolvableLinksResponse
  | Storyblok.TypeStorePageWithoutUnresolvableLinksResponse
  | Storyblok.TypeStoreWithoutUnresolvableLinksResponse

export type EntryWithSEOSkeleton =
  | Storyblok.TypeContentPageSkeleton
  | Storyblok.TypeListingPageSkeleton
  | Storyblok.TypePageSkeleton
  | Storyblok.TypeStorePageSkeleton
  | Storyblok.TypeStoreSkeleton

export type EntryWithSEOPage =
  | Storyblok.TypeContentPage
  | Storyblok.TypeListingPage
  | Storyblok.TypePage
  | Storyblok.TypeStorePage
  | Storyblok.TypeStore

export type SbStory<T> = {
  data: {
    cv: number
    links: (ISbStoryData<T> | ISbLinkURLObject)[]
    rels: ISbStoryData<T>[]
    story: ISbStoryData<T>
  }
  headers: unknown
}

export type SbStoryWithSeo<T> = {
  data: {
    cv: number
    links: (ISbStoryData<T> | ISbLinkURLObject)[]
    rels: ISbStoryData<T>[]
    story: ISbStoryData<T & { SEO: SbSeo }>
  }
  headers: unknown
}
