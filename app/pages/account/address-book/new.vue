<template>
  <div>
    <SFHeadline tag="h2" class="mb-5">
      {{ $t('address_book.add_new_address') }}
    </SFHeadline>
    <SFAddressForm/>
  </div>
</template>

<script setup lang="ts">
import SFAddressForm from '~/components/addressBook/SFAddressForm.vue'
import { SFHeadline } from '#storefront-ui/components'
</script>