import type { ModuleOptions } from '../types'
import { useNuxtApp } from '#app'

export function useCMSOptions() {
  const { cms } = useNuxtApp()
  return {
    provider: (cms as ModuleOptions).provider,
  }
}
