<template>
  <div>
    <SFHeadline tag="h2" class="mb-5">
      {{ $t('address_book.add_new_address') }}
    </SFHeadline>
    <SFAddressForm
      mode="create"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app/composables/router'
import { useToast } from '~/composables'
import { routeList } from '~/utils/route'
import { useRpcCall } from '#storefront/composables'
const createAddress = useRpcCall('createAddress')

const router = useRouter()
const toast = useToast()

const handleSave = async (addressData) => {
  try {
    await createAddress(addressData) // RPC call
    toast.show($t('address_book.created_success'), { type: 'SUCCESS' })
    router.push(routeList.addressBook.path)
  } catch (error) {
    toast.show($t('address_book.created_error'), { type: 'ERROR' })
  }
}

</script>