import { toValue } from 'vue'
import type { NuxtApp } from '#app'

/**
 * A getCached data function which can be used to share cached data across different instances of `useAsyncData` and `useRpc`.
 * @param key - Cache key to retrieve the data from.
 * @param nuxtApp - The current instance of the Nuxt application.
 * @returns Cached data if available, otherwise `undefined`.
 */
export const globalGetCachedData = <T>(
  key: string,
  nuxtApp: NuxtApp,
): T | undefined => {
  return (toValue(nuxtApp._asyncData[key]?.data) as T) || undefined
}
