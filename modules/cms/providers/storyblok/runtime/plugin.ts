// plugins/storyblok.js
import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import type { StoryblokRuntimeConfig } from '../types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig()
  const cms = runtimeConfig.public.cms as StoryblokRuntimeConfig

  vueApp.use(StoryblokVue, {
    ...JSON.parse(JSON.stringify(runtimeConfig.public.storyblok)),
    // NOTE: accessToken needs to be located after the destructured original storyblok runtimeConfig
    // else, it will get overridden with the empty default string of the Storyblok nuxt module.
    accessToken:
      cms.accessToken ?? import.meta.env.NUXT_PUBLIC_CMS_ACCESS_TOKEN,
    use: [apiPlugin],
  })
})
