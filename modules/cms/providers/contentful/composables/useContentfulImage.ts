import { reactive } from 'vue'
import { useStorefrontBreakpoints } from '../../../composables/storefront/useStorefrontBreakpoints'
import type {
  TypeImageWithoutUnresolvableLinksResponse,
  TypePageWithoutUnresolvableLinksResponse,
} from '../types'

type CMSImage = TypeImageWithoutUnresolvableLinksResponse
type TeaserImage = TypePageWithoutUnresolvableLinksResponse

type SanitizedImage = {
  src: string
  alt: string
}

const isMobile = () => useStorefrontBreakpoints()?.isSmaller('md')

export function useContentfulImageSanitizer() {
  const sanitize = (img: CMSImage | null | undefined): SanitizedImage => {
    if (!img) {
      return {
        src: '',
        alt: '',
      }
    }
    const image = isMobile() ? img.fields.mobileImage : img.fields.desktopImage

    return {
      src: image?.fields.file?.url ?? '',
      alt: image?.fields.title ?? image?.fields.file?.fileName ?? '',
    }
  }
  return {
    sanitize,
  }
}

export function getTeaserImage(img: TeaserImage | null | undefined) {
  const sanitizedImage: SanitizedImage = reactive({
    src: '',
    alt: '',
  })
  if (img) {
    const image = isMobile()
      ? img.fields.teaserImageMobile
      : img.fields.teaserImage
    sanitizedImage.src = image?.fields.file?.url ?? ''
    sanitizedImage.alt =
      image?.fields.title ?? image?.fields.file?.fileName ?? ''
  }
  return sanitizedImage
}
