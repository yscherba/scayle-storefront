import { computed } from 'vue'
import type { Alignment } from '../types'

export function useCMSAlignment(alignment: Partial<Alignment>) {
  return {
    align: computed(() => {
      switch (alignment.align) {
        case 'start':
          return ['mb-auto', 'justify-start']
        case 'center':
          return ['my-auto', 'justify-center']
        case 'end':
        default:
          return ['mt-auto', 'justify-end']
      }
    }),

    justify: computed(() => {
      switch (alignment.justify) {
        case 'end':
          return ['ml-auto', 'text-right', 'items-end']
        case 'center':
          return ['mx-auto', 'text-center', 'items-center']
        case 'start':
        default:
          return ['mr-auto', 'items-start']
      }
    }),
  }
}
