import { useNuxtApp } from '#app'

export function useContentful() {
  const { $contentful } = useNuxtApp()
  return $contentful
}
