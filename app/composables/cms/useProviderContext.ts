import { inject, provide, type InjectionKey } from 'vue'
import type { usePromotionEvents } from '../tracking'
import type { useDefaultBreakpoints } from '#storefront-ui/composables'
import type { useTrackingEvents } from '~/composables/useTrackingEvents'

export function createContext<T>(
  key: InjectionKey<T> = Symbol(''),
  context: T,
) {
  return provide(key, context)
}
export function useContext<T>(key: InjectionKey<T> = Symbol('')) {
  return inject<T>(key)
}

// useTrackingEvents
type UseTrackingEvents = ReturnType<typeof useTrackingEvents>
export const USE_TRACKING_EVENTS_KEY: InjectionKey<UseTrackingEvents> = Symbol(
  'useTrackingEventsInjectionKey',
)

// useDefaultBreakpoints
type UseDefaultBreakpoints = ReturnType<typeof useDefaultBreakpoints>
export const USE_DEFAULT_BREAKPOINTS_KEY: InjectionKey<UseDefaultBreakpoints> =
  Symbol('useDefaultBreakpointsInjectionKey')

type UsePromotionEvents = ReturnType<typeof usePromotionEvents>
export const USE_PROMOTION_EVENTS_KEY: InjectionKey<UsePromotionEvents> =
  Symbol('usePromotionEventsInjectionKey')
