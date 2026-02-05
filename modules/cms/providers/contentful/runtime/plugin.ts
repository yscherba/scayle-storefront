import { createClient } from 'contentful'
import type { ContentfulRuntimeConfig } from '../types'
import { useContentfulEditor } from '../composables/useContentfulEditor'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'cms:contentful',
  setup() {
    const config = useRuntimeConfig()
    const cms = config.public.cms as ContentfulRuntimeConfig

    const { isInEditorMode } = useContentfulEditor()

    const hasPreviewAccessToken = !!cms.previewAccessToken

    const host =
      isInEditorMode && hasPreviewAccessToken
        ? cms.previewHost ?? 'preview.contentful.com'
        : cms.host ?? 'cdn.contentful.com'

    const accessToken =
      isInEditorMode && hasPreviewAccessToken
        ? cms.previewAccessToken ?? ''
        : cms.accessToken

    // https://contentful.github.io/contentful.js/contentful/7.14.8/contentful.html#.createClient
    const client = createClient({
      accessToken,
      space: cms.space,
      host,
    })

    return {
      provide: {
        contentful: client,
      },
    }
  },
})
