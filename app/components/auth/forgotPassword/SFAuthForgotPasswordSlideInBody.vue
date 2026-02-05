<template>
  <form @submit.prevent="onSubmit">
    <SFErrorMessageContainer
      data-testid="forgot-password-error-message-container"
      :message="errorMessage"
      class="mb-8"
    />
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.email.$errors">
      <SFTextInput
        v-model="email"
        autocomplete="email"
        :placeholder="$t('form_fields.email')"
        type="email"
        :has-errors="!isValid"
        name="forgot-password-email"
        required
        :readonly="isSubmitting"
        data-testid="forgot-password-email"
        @change="v.email.$touch()"
      />
    </SFValidatedInputGroup>
    <div
      class="flex flex-wrap items-center justify-between gap-4 max-lg:items-start lg:flex-row"
    >
      <SFButton
        variant="raw"
        :disabled="isSubmitting"
        class="mr-7 h-6 rounded-md px-1.5 text-md font-semibold !text-secondary hover:bg-gray-200"
        data-testid="back-to-login-button"
        type="button"
        @click.prevent="backToLogin"
      >
        <IconChevronLeft class="size-4" />
        {{ $t('auth_forgot_password.back_to_login') }}
      </SFButton>
      <SFButton
        :disabled="isSubmitting"
        type="submit"
        class="grow"
        data-testid="get-reset-password-link-button"
      >
        {{ $t('auth_forgot_password.submit') }}
      </SFButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { watchImmediate } from '@vueuse/core'
import SFErrorMessageContainer from '../../SFErrorMessageContainer.vue'
import { useValidationRules, useRouteHelpers } from '~/composables'
import {
  SFButton,
  SFTextInput,
  SFValidatedInputGroup,
} from '#storefront-ui/components'
import { routeList } from '~/utils'

const emit = defineEmits<{ close: []; submit: [email: string] }>()

const { prefilledEmail } = defineProps<{
  prefilledEmail: string
  isSubmitting: boolean
  errorMessage: string | null
}>()

const validationRules = useValidationRules()

const { localizedNavigateTo } = useRouteHelpers()

const email = ref('')

const onSubmit = async () => {
  const isValid = await v.value.$validate()
  if (!isValid) {
    return
  }
  emit('submit', email.value)
}

const backToLogin = async () => {
  emit('close')
  await localizedNavigateTo(routeList.signin)
}

const emailRules = {
  required: validationRules.required,
  email: validationRules.email,
}

const v = useVuelidate({ email: emailRules }, { email })

watchImmediate(
  () => prefilledEmail,
  (value) => {
    email.value = value
  },
)
</script>
