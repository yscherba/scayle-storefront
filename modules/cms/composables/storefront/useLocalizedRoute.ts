import {
  hasLocalePrefix,
  isExternalLink,
  normalizePathRoute,
  normalizeHomeLink,
} from '../../utils/helpers'
import type { RouteLocationRaw } from '#vue-router'
import { useCurrentShop } from '#storefront/composables'
import { useLocalePath } from '#i18n'

export function useLocalizedRoute() {
  const localePath = useLocalePath()
  const currentShop = useCurrentShop()

  const getLocalizedRoute = (route: RouteLocationRaw) => {
    if (typeof route !== 'string') {
      const isLocalePath =
        'path' in route &&
        route.path !== undefined &&
        hasLocalePrefix(route.path, currentShop.value?.path)

      return isLocalePath ? route : localePath(route)
    }

    if (isExternalLink(route)) {
      return route
    }

    const normalizedHomeLink = normalizeHomeLink(route) as string

    const normalizedPath = normalizePathRoute(normalizedHomeLink)

    return hasLocalePrefix(normalizedPath, currentShop.value?.path)
      ? normalizedPath
      : localePath(normalizedPath)
  }

  return {
    getLocalizedRoute,
  }
}
