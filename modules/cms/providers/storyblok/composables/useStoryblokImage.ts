import type { SbCmsImage, Sbasset } from '../types/storyblok'
import { useDefaultBreakpoints } from '#storefront-ui/composables'

type SanitizedImage = {
  src: string
  alt: string
}

const isMobile = () => useDefaultBreakpoints().isSmaller('md')

export function useStoryblokImageSanitizer() {
  const sanitize = (img: SbCmsImage): SanitizedImage => {
    return {
      src: img[isMobile() ? 'mobile_image' : 'desktop_image']?.filename || '',
      alt: img?.desktop_image?.alt || '',
    }
  }
  return {
    sanitize,
  }
}

interface BlokWithTeaser {
  teaser_image?: Sbasset
  teaser_image_mobile?: Sbasset
}

export function hasTeaser(blok: object): blok is BlokWithTeaser {
  return 'teaser_image' in blok || 'teaser_image_mobile' in blok
}

export function getTeaserImage(blok: BlokWithTeaser) {
  const sanitizedImage: SanitizedImage = { src: '', alt: '' }

  const desktopImageProperty = 'teaser_image'
  const mobileImageProperty = 'teaser_image_mobile'

  if (blok) {
    const imageKey = isMobile() ? mobileImageProperty : desktopImageProperty
    const fallbackBlok = blok[desktopImageProperty]
    const image = blok[imageKey]?.filename ? blok[imageKey] : fallbackBlok
    sanitizedImage.src = image?.filename || ''
    sanitizedImage.alt = image?.alt || image?.name || ''
  }

  return sanitizedImage
}
