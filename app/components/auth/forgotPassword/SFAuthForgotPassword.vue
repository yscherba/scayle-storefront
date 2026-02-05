<template>
  <SFButton
    class="inline-block w-fit rounded-md p-1 text-sm !text-secondary duration-300 ease-out hover:bg-gray-200 focus-visible:transition-none"
    data-testid="reset-password-button"
    variant="raw"
    @click.prevent="toggle"
  >
    {{ $t('auth_forgot_password.title') }}
  </SFButton>
  <SFSlideIn
    :name="SLIDE_IN_KEY"
    class="max-md:top-auto max-md:!h-auto max-md:rounded-t-xl md:!w-96"
    data-testid="reset-password-flyout"
    slide-class="!max-w-none"
    borderless
    @close="errorMessage = null"
  >
    <template #slide-in-header>
      <SFAuthForgotPasswordSlideInHeader @close="closeAndClear" />
    </template>
    <template #slide-in-body>
      <SFAuthForgotPasswordSlideInBody
        v-if="isOpen"
        class="px-6 py-4 max-lg:pb-11"
        :prefilled-email="prefilledEmail"
        :error-message="errorMessage"
        :is-submitting="isSubmitting"
        @close="closeAndClear"
        @submit="submit"
      />
    </template>
  </SFSlideIn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SFAuthForgotPasswordSlideInHeader from './SFAuthForgotPasswordSlideInHeader.vue'
import SFAuthForgotPasswordSlideInBody from './SFAuthForgotPasswordSlideInBody.vue'
import { SFButton, SFSlideIn } from '#storefront-ui/components'
import { useSlideIn } from '#storefront-ui/composables'
import { useAuthentication } from '~/composables'
import { resolveErrorMessage } from '~/utils/authentication'
import { useI18n } from '#i18n'

const SLIDE_IN_KEY = 'ForgotPasswordSlideIn'

defineProps<{ prefilledEmail: string }>()

const { toggle, close, isOpen } = useSlideIn(SLIDE_IN_KEY)

const { forgotPassword } = useAuthentication()

const closeAndClear = () => {
  errorMessage.value = null
  close()
}
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)
const i18n = useI18n()
const submit = async (email: string) => {
  try {
    isSubmitting.value = true
    errorMessage.value = null
    await forgotPassword(email)
    closeAndClear()
  } catch (error) {
    errorMessage.value = resolveErrorMessage(error, 'forgot_password', i18n)
  } finally {
    isSubmitting.value = false
  }
}
</script>
