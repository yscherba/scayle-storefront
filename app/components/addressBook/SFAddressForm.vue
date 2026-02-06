
<template>
  <div class="p-6 max-w-md mx-auto">
    <h3 class="text-xl font-semibold mb-4">Add Address Form</h3>

    <div class="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 class="font-medium mb-2">Dummy Address Data:</h4>
      <pre class="text-sm text-gray-600 whitespace-pre-wrap">{{ JSON.stringify(dummyAddress2) }}</pre>
    </div>

    <SFButton
      @click="handleSave(dummyAddress2)"
      variant="primary"
      class="w-full"
    >
      Save Dummy Address
    </SFButton>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useValidationRules, useToast } from '~/composables'
import type { ShopUserAddress } from '@scayle/storefront-nuxt'
import { useRpcCall } from '#storefront/composables'
import { useRouter } from '#app/composables/router'
import { routeList } from '~/utils/route'
import { useUser } from '#storefront/composables'

import {
  SFButton,
  SFTextInput,
  SFValidatedInputGroup,
} from '#storefront-ui/components'

const createAddress = useRpcCall('createAddress')
const router = useRouter()
const toast = useToast()
const { user } = useUser()

const dummyAddress2 = computed(() => ({
  countryCode: 'USA',
  city: 'New York',
  street: 'Fat Cafe Street',
  houseNumber: '17',
  zipCode: '14003',
  isDefault: { shipping: false, billing: false },
  customer: { id: user.value?.id || 1 },
  recipient: {
    firstName: user.value?.firstName || 'John',
    gender: user.value?.gender || 'm',
    lastName: user.value?.lastName || 'Doe',
   }
}))

const handleSave = async (address) => {
  try {
    await createAddress({ address: address }) // RPC call with correct parameter structure
    toast.show('Address created successfully', { type: 'SUCCESS' })
    //router.push(routeList.addressBook.path)
  } catch (error) {
    toast.show('Failed to create address', { type: 'ERROR' })
  }
}

const payload = reactive({})
const rules = computed(() => ({}))
const v = useVuelidate(rules.value, payload)
</script>