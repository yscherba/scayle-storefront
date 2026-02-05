import {
  addComponentsDir,
  addPlugin,
  addTypeTemplate,
  createResolver,
} from '@nuxt/kit'
import type { Nuxt, NuxtOptions } from 'nuxt/schema'
import { CMSProvider } from '../../utils/config'
import { logger } from '../../utils/helpers'
import type { ModuleOptions } from '../../types'
import type { ContentfulModuleOptions } from './types'

export async function setupContentful(options: ModuleOptions, nuxt: Nuxt) {
  const resolver = createResolver(import.meta.url)
  logger.info('Using Contentful as Storefront CMS provider')

  const runtimeCMS = nuxt.options.runtimeConfig?.public.cms

  nuxt.options.image = {
    ...nuxt.options.image,
    contentful: {
      baseURL: 'https://images.ctfassets.net',
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
    logger.error('Missing Contentful accessToken')
  }
  if (
    runtimeCMS.space === undefined &&
    !import.meta.env.NUXT_PUBLIC_CMS_SPACE
  ) {
    logger.error('Missing Contentful spaceId')
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
    src: resolver.resolve('./types/contentful-defs.d.ts'),
  })
  addTypeTemplate({
    filename: 'cms-generated.d.ts',
    src: resolver.resolve('./types/gen/index.ts'),
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
      import { ContentfulRuntimeConfig } from '${resolver.resolve(
        './types/index.ts',
      )}'
      declare module '@nuxt/schema' {
        interface RuntimeConfig {
          cms: ContentfulRuntimeConfig
        }
        interface PublicRuntimeConfig {
          cms: ContentfulRuntimeConfig
        }
      }
      export {}
      `
    },
  })
}

export function isProviderContentful(
  options: ModuleOptions,
): options is ContentfulModuleOptions {
  return options.provider === CMSProvider.CONTENTFUL
}
