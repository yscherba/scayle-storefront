<template>
  <SFSlideIn
    :name="SLIDE_IN_KEY"
    class="max-md:top-auto max-md:!h-auto max-md:rounded-t-xl md:!w-96"
    slide-class="!max-w-none"
    borderless
  >
    <template #slide-in-header>
      <SFAuthResetPasswordSlideInHeader @close="closeAndClear" />
    </template>
    <template #slide-in-body>
      <SFAuthResetPasswordSlideInBody
        v-if="isOpen"
        :error-message="errorMessage"
        :is-submitting="isSubmitting"
        class="px-6 py-4 max-lg:pb-11"
        @close="closeAndClear"
        @submit="submit"
      />
    </template>
  </SFSlideIn>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SFAuthResetPasswordSlideInHeader from './SFAuthResetPasswordSlideInHeader.vue'
import SFAuthResetPasswordSlideInBody from './SFAuthResetPasswordSlideInBody.vue'
import { SFSlideIn } from '#storefront-ui/components'
import { useSlideIn } from '#storefront-ui/composables'
import { useAuthentication } from '~/composables'
import { useRoute, useRouter } from '#app/composables/router'
import { resolveErrorMessage } from '~/utils/authentication'
import { useI18n } from '#i18n'

const SLIDE_IN_KEY = 'ResetPasswordSlideIn'

const route = useRoute()
const router = useRouter()

const hasToken = computed(() => !!route.query.hash)

const { close, isOpen } = useSlideIn(SLIDE_IN_KEY, hasToken.value)

const { resetPasswordByHash } = useAuthentication()

const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)
const i18n = useI18n()

const closeAndClear = () => {
  router.replace({ query: {} })
  errorMessage.value = null
  close()
}

const submit = async (payload: { password: string; hash: string }) => {
  isSubmitting.value = true
  errorMessage.value = null

  try {
    await resetPasswordByHash(payload)
    closeAndClear()
  } catch (error) {
    errorMessage.value = resolveErrorMessage(error, 'reset_password', i18n)
  } finally {
    isSubmitting.value = false
  }
}
</script>
