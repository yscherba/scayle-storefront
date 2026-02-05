<template>
  <I18nT
    keypath="auth_register_privacy_disclaimer.privacy_disclaimer"
    tag="p"
    scope="global"
    class="text-sm leading-5 text-secondary"
    data-testid="privacy-disclaimer-info"
  >
    <template #terms>
      <SFLink
        :to="PRIVACY_POLICY_LINK"
        target="_blank"
        raw
        class="rounded-md font-semibold hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-200"
        data-testid="terms-of-service-link"
      >
        {{ $t('auth_register_privacy_disclaimer.go_to_terms_of_service') }}
      </SFLink>
    </template>
    <template #policy>
      <SFLink
        :to="PRIVACY_POLICY_LINK"
        target="_blank"
        raw
        class="mr-0.5 rounded-md font-semibold hover:bg-gray-200 hover:outline hover:outline-2 hover:outline-gray-200"
        data-testid="privacy-policy-link"
      >
        {{ $t('auth_register_privacy_disclaimer.go_to_privacy_policy') }}
      </SFLink>
    </template>
  </I18nT>
</template>

<script setup lang="ts">
import { I18nT } from '#i18n'
import { SFLink } from '#storefront-ui/components'

const PRIVACY_POLICY_LINK = 'https://www.scayle.com/privacy-policy/'
</script>
