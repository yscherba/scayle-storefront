<template>
  <SFAsyncDataWrapper :async-data="addressPromise">
    <template #default="{ data }">
      <SFHeadline tag="h2" class="mb-5">
        {{ $t('address_book.edit_address') }}
      </SFHeadline>
      <SFAddressForm
        :address="data"
        mode="edit"
        @save="handleSave"
        @cancel="handleCancel"
      />
    </template>
    <template #loading>
      <SFAddressFormSkeletonLoader />
    </template>
  </SFAsyncDataWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, onServerPrefetch } from 'vue'
import { useRpcCall } from '#storefront/composables'
import { useSeoMeta, definePageMeta } from '#imports'
import { HttpStatusCode } from '@scayle/storefront-nuxt'
import { useRoute, useRouter } from '#app/composables/router'
// ... other imports

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string)

// Fetch address by ID
const addressPromise = useRpc('getAddressById', `address-${id.value}`, { id: id.value })

const validateAddressExists = async () => {
  const { error, status } = addressPromise
  await addressPromise

  if (error.value || (status.value !== 'pending' && !addressPromise.data.value)) {
    throw createError({ statusCode: HttpStatusCode.NOT_FOUND, fatal: true })
  }
}

definePageMeta({
  pageType: 'account_area:address_edit',
  validate(route) {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id!)
  },
})
</script>