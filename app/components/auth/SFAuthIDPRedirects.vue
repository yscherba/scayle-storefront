<template>
  <div class="flex flex-col gap-4 pb-6">
    <SFButton
      v-for="(redirect, provider) in redirects"
      :key="redirect"
      variant="secondary"
      :to="redirect"
    >
      {{ getLabel(provider) }}
    </SFButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SFButton } from '#storefront-ui/components'
import { useRoute } from '#imports'
import { useI18n } from '#i18n'

const { redirects } = defineProps<{ redirects: Record<string, string> }>()

const { t } = useI18n()

const route = useRoute()

const isRegisterRoute = computed(() => route.query.register === 'true')

const getLabel = (provider: string): string => {
  const registerOrLoginKey = isRegisterRoute.value ? 'register' : 'login'
  return t(`auth_idp_redirects.${registerOrLoginKey}.${provider}`)
}
</script>
