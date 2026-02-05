<template>
  <form
    v-if="v"
    ref="registerForm"
    class="flex flex-col gap-0.5"
    data-testid="register-form"
    @submit.prevent="onSubmit"
    @keydown.enter.prevent="onEnter"
  >
    <SFErrorMessageContainer
      data-testid="register-error-message-container"
      :message="errorMessage"
      class="mb-8"
    />
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.gender.$errors">
      <SFGenderSelection
        v-model="userPayload.gender"
        :disabled="isSubmitting"
        :is-valid="isValid"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.first_name.$errors">
      <SFTextInput
        v-model="userPayload.first_name"
        autocomplete="given-name"
        :placeholder="$t('form_fields.first_name')"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        data-testid="reg-input-first-name"
        @change="v.first_name.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.last_name.$errors">
      <SFTextInput
        v-model="userPayload.last_name"
        autocomplete="family-name"
        :placeholder="$t('form_fields.last_name')"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        data-testid="reg-input-last-name"
        @change="v.last_name.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.email.$errors">
      <SFTextInput
        v-model="userPayload.email"
        autocomplete="email"
        :placeholder="$t('form_fields.email')"
        type="email"
        :has-errors="!isValid"
        required
        :readonly="isSubmitting"
        data-testid="reg-input-email-address"
        @change="v.email.$touch()"
      />
    </SFValidatedInputGroup>
    <SFValidatedInputGroup
      v-if="!isGuestFlowEnabled"
      v-slot="{ isValid }"
      class="h-26 sm:h-22"
      :errors="v.password.$errors"
    >
      <SFPasswordInput
        v-model="userPayload.password"
        :is-valid="isValid"
        :name="PASSWORD_FIELD_NAME"
        :placeholder="$t('form_fields.password')"
        autocomplete="new-password"
        data-testid="reg-input-password"
        @change="v.password.$touch()"
      />
    </SFValidatedInputGroup>
    <SFAuthRegisterToggleGuest v-model="isGuestFlowEnabled" />
    <div class="flex items-center justify-between">
      <SFButton
        :disabled="isSubmitting"
        :loading="isSubmitting"
        data-testid="register-submit"
        class="w-1/2"
        type="submit"
      >
        {{ $t('auth_register.submit_sign_up') }}
      </SFButton>
      <span class="text-sm text-secondary">
        {{ $t('auth_register.mandatory_info_legend') }}
      </span>
    </div>
  </form>
  <SFAuthRegisterPrivacyDisclaimer class="mt-5" />
  <SFAuthSeparator v-if="externalIDPRedirects" class="my-8 lg:my-10" />
  <SFAuthIDPRedirects
    v-if="externalIDPRedirects"
    :redirects="externalIDPRedirects"
  />
  <p
    class="text-start text-md text-secondary"
    data-testid="existing-account-label"
    :class="{ 'mt-8': !externalIDPRedirects }"
  >
    {{ $t('auth_register.already_signed_up_question') }}
    <SFLocalizedLink
      :to="routeList.signin"
      raw
      class="rounded-md p-1 py-0.5 font-semibold hover:bg-gray-200"
      data-testid="login-page-link"
    >
      {{ $t('auth_register.go_to_login') }} </SFLocalizedLink
    >.
  </p>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import type { Gender } from '@scayle/storefront-nuxt'
import type { Required } from 'utility-types'
import SFPasswordInput from '../../form/SFPasswordInput.vue'
import SFGenderSelection from '../../form/SFGenderSelection.vue'
import SFErrorMessageContainer from '../../SFErrorMessageContainer.vue'
import SFAuthIDPRedirects from '../SFAuthIDPRedirects.vue'
import SFAuthRegisterPrivacyDisclaimer from './SFAuthRegisterPrivacyDisclaimer.vue'
import SFAuthRegisterToggleGuest from './SFAuthRegisterToggleGuest.vue'
import { useI18n } from '#i18n'
import SFLocalizedLink from '~/components/SFLocalizedLink.vue'
import { useValidationRules, useAuthentication } from '~/composables'
import { routeList } from '~/utils'
import {
  SFButton,
  SFTextInput,
  SFValidatedInputGroup,
} from '#storefront-ui/components'
import SFAuthSeparator from '~/components/auth/SFAuthSeparator.vue'
import { PASSWORD_MIN_LENGTH } from '~~/shared/constants/password'
import { resolveErrorMessage } from '~/utils/authentication'

defineProps<{ externalIDPRedirects?: Record<string, string> }>()

const isGuestFlowEnabled = ref(false)

// eslint-disable-next-line sonarjs/no-hardcoded-passwords
const PASSWORD_FIELD_NAME = 'register-password'

const { register, guestLogin } = useAuthentication()
const validationRules = useValidationRules()

type UserPayload = {
  gender?: Gender
  first_name: string
  last_name: string
  email: string
  password: string
}

// Using `reactive` instead of `ref` for forms with multiple inputs.
// While both `ref` and `reactive` can achieve reactivity with objects, `reactive`
// is specifically optimized for managing collections of reactive properties,
// making it a more natural and efficient choice for complex forms.
const userPayload = reactive<UserPayload>({
  gender: undefined,
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})

const registerForm = useTemplateRef('registerForm')

const onEnter = (event: KeyboardEvent) => {
  const formElements = Array.from(
    registerForm?.value?.elements ?? [],
  ) as HTMLElement[]
  const currentIndex = formElements.indexOf(event.target as HTMLElement)
  const currentElement = formElements[currentIndex]
  const nextElement = formElements[currentIndex + 1]

  const isCurrentElementButton = currentElement?.tagName === 'BUTTON'

  if (isCurrentElementButton) {
    return currentElement.click()
  }

  // Check if current element is password field and that it has toggle
  // visibility button in it. If yes, skip it, end focus element after
  if (
    (currentElement as HTMLInputElement).name === PASSWORD_FIELD_NAME &&
    nextElement?.firstElementChild?.localName === 'svg'
  ) {
    const nextSecondElement = formElements[currentIndex + 2]
    return nextSecondElement?.focus()
  }

  if (nextElement) {
    return nextElement.focus()
  }

  onSubmit()
}

const validateForm = async (): Promise<boolean> => {
  await v.value.$validate()
  // Exclude password validation for guest flow; otherwise, validate all fields
  return isGuestFlowEnabled.value
    ? v.value.$errors.every((item) => item.$property === 'password')
    : !v.value.$errors.length
}
const errorMessage = ref<string | null>(null)
const isSubmitting = ref(false)
const i18n = useI18n()
const onSubmit = async () => {
  const isValid = await validateForm()

  if (!isValid) {
    return
  }

  const { password, ...payload } = userPayload

  isSubmitting.value = true
  errorMessage.value = null
  try {
    if (isGuestFlowEnabled.value) {
      await guestLogin(payload as Required<Omit<UserPayload, 'password'>>)
    } else {
      await register({ ...payload, password } as Required<UserPayload>)
    }
  } catch (error) {
    errorMessage.value = resolveErrorMessage(
      error,
      isGuestFlowEnabled.value ? 'guest_login' : 'sign_up',
      i18n,
    )
  } finally {
    isSubmitting.value = false
  }
}

const v = useVuelidate(
  {
    gender: {
      required: validationRules.required,
    },
    first_name: {
      required: validationRules.required,
      name: validationRules.name,
    },
    last_name: {
      required: validationRules.required,
      name: validationRules.name,
    },
    email: {
      required: validationRules.required,
      email: validationRules.email,
    },
    password: {
      required: validationRules.required,
      password: validationRules.password,
      minLength: validationRules.minLength(PASSWORD_MIN_LENGTH),
    },
  },
  userPayload as Required<UserPayload>,
)
</script>
