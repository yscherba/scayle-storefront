import {
  addComponentsDir,
  addPlugin,
  addTypeTemplate,
  createResolver,
  installModule,
} from '@nuxt/kit'
import type { ModuleOptions as StoryblokDefaultModuleOptions } from '@storyblok/nuxt'
import type { Nuxt, NuxtOptions } from 'nuxt/schema'
import { logger } from '../../utils/helpers'
import type { ModuleOptions } from '../../types'
import { CMSProvider } from '../../utils/config'
import type { StoryblokModuleOptions } from './types'

export async function setupStoryblok(options: ModuleOptions, nuxt: Nuxt) {
  const resolver = createResolver(import.meta.url)
  logger.info('Using Storyblok as Storefront CMS provider')

  const runtimeCMS = nuxt.options.runtimeConfig?.public.cms

  if (!nuxt.options.modules.includes('@storyblok/nuxt')) {
    // NOTE: We need to enable sudo mode, as we define our own Storyblok Vue plugin
    // and thus want to avoid duplicate initialization.
    // https://github.com/storyblok/storyblok-nuxt?tab=readme-ov-file#define-your-own-plugin
    await installModule('@storyblok/nuxt', {
      componentsDir: '',
      enableSudoMode: true,
    })
  }

  if ('storyblok' in nuxt.options) {
    // Check if `nuxt.options.storyblok` exists and is falsy. If so, initialize it.
    // Otherwise, spread existing options and override `componentsDir`.
    nuxt.options.storyblok = nuxt.options.storyblok
      ? {
          ...(nuxt.options.storyblok as StoryblokDefaultModuleOptions),
          componentsDir: '',
        }
      : ({} as StoryblokDefaultModuleOptions)
  }

  nuxt.options.image = {
    ...nuxt.options.image,
    domains: ['https://a.storyblok.com'],
    storyblok: {
      baseURL: 'https://a.storyblok.com',
      modifiers: {
        // set default quality as modifier. This will force also storyblok to use webp if the client supports it.
        // Setting the format via the format modifier will force the format even when it's not supported by the client.
        quality: '85',
      },
    },
  } as NuxtOptions['image']

  if (
    runtimeCMS.accessToken === undefined &&
    !import.meta.env.NUXT_PUBLIC_CMS_ACCESS_TOKEN
  ) {
    logger.error('Missing Storyblok accessToken')
  }

  addPlugin(resolver.resolve('./runtime/plugin'))

  nuxt.options.alias['#storefront-cms/components'] =
    resolver.resolve('./components')

  await addComponentsDir({
    path: resolver.resolve('./components'),
    prefix: options.componentPrefix ?? 'CMS',
    pathPrefix: false,
    global: true,
  })

  addTypeTemplate({
    filename: 'cms-custom.d.ts',
    src: resolver.resolve('./types/storyblok.d.ts'),
  })
  addTypeTemplate({
    filename: 'cms-generated.d.ts',
    src: resolver.resolve('./types/storyblok.gen.d.ts'),
  })

  addTypeTemplate({
    filename: 'cms-types.d.ts',
    src: resolver.resolve('./types/index.ts'),
  })

  addTypeTemplate({
    filename: 'storefront-cms.d.ts',
    write: true,
    getContents: () => {
      return `
      import { StoryblokRuntimeConfig } from '${resolver.resolve(
        './types/index.ts',
      )}'

      declare module '@nuxt/schema' {
        interface RuntimeConfig {
          cms: StoryblokRuntimeConfig
        }
        interface PublicRuntimeConfig {
          cms: StoryblokRuntimeConfig
        }
      }
      export {}
      `
    },
  })
}

export function isProviderStoryblok(
  options: ModuleOptions,
): options is StoryblokModuleOptions {
  return options.provider === CMSProvider.STORYBLOK
}
