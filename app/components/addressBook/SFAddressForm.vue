
<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <SFErrorMessageContainer :message="errorMessage" class="mb-4" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.firstName.$errors">
        <SFTextInput
          v-model="payload.firstName"
          :has-errors="!isValid"
          :placeholder="$t('form_fields.first_name')"
          required
          @change="v.firstName.$touch()"
        />
      </SFValidatedInputGroup>

      <SFValidatedInputGroup v-slot="{ isValid }" :errors="v.lastName.$errors">
        <SFTextInput
          v-model="payload.lastName"
          :has-errors="!isValid"
          :placeholder="$t('form_fields.last_name')"
          required
          @change="v.lastName.$touch()"
        />
      </SFValidatedInputGroup>
    </div>

    <!-- More form fields... -->

    <div class="flex justify-end gap-3 pt-4">
      <SFButton type="button" variant="secondary" @click="$emit('cancel')">
        {{ $t('global.cancel') }}
      </SFButton>
      <SFButton type="submit" :loading="isSubmitting" :disabled="v.$invalid">
        {{ mode === 'create' ? $t('global.create') : $t('global.save') }}
      </SFButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useValidationRules } from '~/composables'

const props = defineProps<{
  address?: Address
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  save: [data: AddressFormData]
  cancel: []
}>()

// Form state similar to profile form
const validationRules = useValidationRules()
const payload = reactive({
  firstName: props.address?.firstName ?? '',
  lastName: props.address?.lastName ?? '',
  street: props.address?.street ?? '',
  // ... other fields
})

const rules = computed(() => ({
  firstName: { required: validationRules.required },
  lastName: { required: validationRules.required },
  street: { required: validationRules.required },
  // ... other validations
}))

const v = useVuelidate(rules.value, payload)
</script>