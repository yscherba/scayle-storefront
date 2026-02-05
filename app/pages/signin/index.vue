<template>
  <div
    class="m-auto flex max-w-md flex-col items-start justify-center pt-6 *:w-full max-lg:px-4 lg:pt-10"
  >
    <div class="mb-5 flex items-center justify-between lg:mb-7">
      <SFHeadline class="!leading-6 text-primary max-lg:!text-xl" tag="h1">
        {{ $t('sign_in_page.title') }}
      </SFHeadline>
      <IconScreenClick class="size-9 max-lg:hidden" />
    </div>
    <SFAuthTabs class="mb-6 border-b border-b-gray-300 pb-4" />
    <SFAuthLogin
      v-if="!isRegisterRoute"
      :external-i-d-p-redirects="externalIDPRedirects"
    />
    <SFAuthRegister v-else :external-i-d-p-redirects="externalIDPRedirects" />
    <SFAuthResetPasswordSlideIn />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { sanitizeCanonicalURL } from '@scayle/storefront-nuxt'
import { join } from 'pathe'
import { useSeoMeta, useHead, definePageMeta, useRoute } from '#imports'
import { useI18n } from '#i18n'
import { useIDP } from '#storefront/composables'
import { useNuxtApp, useRequestURL } from '#app'
import { SFHeadline } from '#storefront-ui/components'
import SFAuthTabs from '~/components/auth/SFAuthTabs.vue'
import SFAuthRegister from '~/components/auth/register/SFAuthRegister.vue'
import SFAuthResetPasswordSlideIn from '~/components/auth/resetPassword/SFAuthResetPasswordSlideIn.vue'
import SFAuthLogin from '~/components/auth/SFAuthLogin.vue'

const { t } = useI18n()

const route = useRoute()

const { origin } = useRequestURL()

const {
  $config: {
    public: { shopName },
    app: { baseURL },
  },
} = useNuxtApp()

const isRegisterRoute = computed(() => route.query.register === 'true')

const idpParams = computed(() => ({
  queryParams:
    typeof route.query.redirectUrl === 'string'
      ? { redirectUrl: route.query.redirectUrl }
      : undefined,
}))

const idp = useIDP(idpParams)

const externalIDPRedirects = computed(() => {
  return idp.data.value && Object.keys(idp.data.value).length > 0
    ? (idp.data.value as Record<string, string>)
    : undefined
})

useSeoMeta({
  robots: 'noindex,follow',
  title: t('sign_in_page.meta.title'),
  description: t('sign_in_page.meta.description', { shopName }),
})

useHead({
  link: [
    {
      rel: 'canonical',
      key: 'canonical',
      href: sanitizeCanonicalURL(`${origin}${join(baseURL, route.fullPath)}`),
    },
  ],
})

defineOptions({ name: 'SigninPage' })
definePageMeta({ pageType: 'signin_page' })
</script>
