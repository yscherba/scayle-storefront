<template>
  <div
    class="flex min-h-screen flex-col text-primary antialiased anchor-scrolling-none"
  >
    <header
      class="relative flex h-15 items-center justify-between border-b px-7 text-md font-medium text-primary"
    >
      <SFLocalizedLink
        :to="routeList.home"
        raw
        class="flex items-center gap-2 rounded-md p-1 text-md font-medium text-primary hover:bg-gray-200"
      >
        <IconBack class="size-3" />
        <div class="mr-auto hidden pt-0.5 md:block">
          {{ $t('global.back_to_shop') }}
        </div>
        <div class="mr-auto block pt-0.5 md:hidden">
          {{ $t('global.to_shop') }}
        </div>
      </SFLocalizedLink>

      <SFLocalizedLink
        :to="routeList.home"
        raw
        class="absolute left-1/2 -translate-x-1/2"
        :aria-label="shopName"
      >
        <IconLogo class="size-7" />
      </SFLocalizedLink>

      <nav class="hidden flex-row gap-4 md:flex">
        <SFNavigationTreeItem
          v-for="navItem in headerTree?.items"
          :key="`footer-link-${navItem.id}`"
          raw
          class="rounded-md p-1 hover:bg-gray-200"
          :navigation-item="navItem"
        />
        <span class="ml-auto" />
      </nav>
    </header>
    <main class="grow">
      <NuxtPage />
    </main>
    <footer
      class="flex flex-col gap-4 border-t bg-gray-100 px-10 py-5 text-md text-secondary md:flex-row md:gap-8 md:py-7 md:text-primary"
    >
      <SFBottomFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import SFLocalizedLink from '~/components/SFLocalizedLink.vue'
import { useNuxtApp } from '#app/nuxt'
import { useCurrentShop } from '#storefront/composables'
import { useSimpleHeaderNavigation } from '#storefront-navigation/composables'
import { NuxtPage } from '#components'
import SFNavigationTreeItem from '~/components/SFNavigationTreeItem.vue'
import { routeList } from '~/utils/route'
import SFBottomFooter from '~/components/SFBottomFooter.vue'
import { createCacheFriendlyTimestamp } from '~/utils'

const currentShop = useCurrentShop()

const { data: headerTree } = useSimpleHeaderNavigation({
  visibleAt: createCacheFriendlyTimestamp(),
})

const {
  $config: {
    public: { shopName },
  },
} = useNuxtApp()

// Meta tags
useHead({
  bodyAttrs: {
    class: ['relative'],
  },
  htmlAttrs: {
    lang: () => new Intl.Locale(currentShop.value.locale).language,
  },
  script: [
    {
      // Add loaded class to body after DOMContentLoaded
      innerHTML: `document.addEventListener('DOMContentLoaded', () => { document.body.classList.add('loaded'); });`,
    },
  ],
  titleTemplate: (title) => (title ? `${title} | ${shopName}` : `${shopName}`),
})
defineOptions({ name: 'AppSimple' })
</script>
