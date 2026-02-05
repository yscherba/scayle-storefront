import { addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import {
  isProviderStoryblok,
  setupStoryblok,
} from './providers/storyblok/setup'
import {
  isProviderContentful,
  setupContentful,
} from './providers/contentful/setup'
import { moduleName, logger, formattedProvidersKeys } from './utils/helpers'
import type { ModuleOptions } from './types'
import { isProviderScayle, setupScayle } from './providers/scayle/setup'

export type { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: moduleName,
    configKey: 'cms',
    version: '1.0.0',
    compatibility: {
      bridge: false,
      nuxt: '>=3.9',
    },
  },
  defaults: {
    provider: 'scayle',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    if (!options.provider) {
      logger.error(
        `\nYou must define a CMS provider.\nSupported CMS providers are: ${formattedProvidersKeys}!`,
      )
    }

    addImportsDir(resolver.resolve('./composables'))

    if (isProviderScayle(options)) {
      // Early return to prevent unnecessary chunk optimizations, which are specific to contentful and storyblok
      return await setupScayle(options, nuxt)
    }

    if (isProviderStoryblok(options)) {
      await setupStoryblok(options, nuxt)
    }

    if (isProviderContentful(options)) {
      await setupContentful(options, nuxt)
    }

    // Manually adjust rollupOptions.output.manualChunks
    // https://github.com/nuxt/nuxt/issues/22127#issuecomment-1635925362
    nuxt.hooks.hook('vite:extendConfig', (config, { isClient }) => {
      if (isClient) {
        // https://rollupjs.org/configuration-options/#output-manualchunks
        // @ts-expect-error 'config.build.rollupOptions.output' is possibly 'undefined'.ts(18048)
        config.build.rollupOptions.output.manualChunks = function (id) {
          // Key: chunkName, Value: dependency name
          const chunkMap: Record<string, string[]> = {
            axios: ['axios'],
            contentful: [
              'contentful',
              '@contentful/live-preview',
              '@contentful/rich-text-html-renderer',
            ],
            storyblok: [
              '@storyblok/nuxt',
              '@storyblok/vue',
              'storyblok',
              'storyblok-js-client',
            ],
          }

          const chunks = Object.values(chunkMap).flat()

          if (id.includes('/node_modules/')) {
            const chunkName = chunks.find((chunk) => id.includes(chunk))
            return (
              chunkName &&
              Object.keys(chunkMap).find((key: keyof typeof chunkMap) =>
                chunkMap[key]!.includes(chunkName),
              )
            )
          }
        }
      }
    })
  },
})
