import { USE_DEFAULT_BREAKPOINTS_KEY, useContext } from '~/composables'

export const useStorefrontBreakpoints = () => {
  return useContext(USE_DEFAULT_BREAKPOINTS_KEY)
}
