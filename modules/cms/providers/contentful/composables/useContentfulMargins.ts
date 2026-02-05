import { computed } from 'vue'
import type {
  MarginKey,
  TypeMarginWithoutUnresolvableLinksResponse,
} from '../types'

export function useContentfulMargins(
  content: TypeMarginWithoutUnresolvableLinksResponse | undefined,
) {
  if (!content || !content.fields.marginTop) {
    return {
      marginClasses: [''],
      marginTop: '',
    }
  }
  const margins: Record<MarginKey, string> = {
    '': '',
    xs: 'mt-2',
    sm: 'mt-4',
    md: 'mt-8',
    lg: 'mt-12',
    xl: 'mt-16',
    '2xl': 'mt-20',
    '3xl': 'mt-24',
    '4xl': 'mt-28',
  }

  const marginTop = computed(
    () => content?.fields.marginTop && margins[content.fields.marginTop],
  )
  const marginClasses = computed(() =>
    content?.fields.marginTop ? [marginTop.value] : [''],
  )

  return {
    marginTop,
    marginClasses,
  }
}
