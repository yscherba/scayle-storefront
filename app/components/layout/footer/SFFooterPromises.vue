<template>
  <div
    id="shopping-promises"
    class="border-y border-gray-300 py-8"
    data-testid="shopping-promises"
  >
    <div
      class="container flex flex-col justify-center gap-6 px-6 uppercase md:flex-row md:items-center"
    >
      <p
        class="inline-flex items-center gap-2 text-sm md:gap-4"
        data-testid="shopping-promise-invoice"
      >
        <IconInvoice class="size-4 md:size-6" />
        {{ $t('footer_promises.payment_options') }}
      </p>
      <p
        class="inline-flex items-center gap-2 text-sm md:gap-4"
        data-testid="shopping-promise-shipping"
      >
        <IconDelivery class="size-4 md:size-6" />
        {{
          $t('footer_promises.free_shipping', {
            currency: currentShop.currency,
          })
        }}
      </p>
      <p
        class="inline-flex items-center gap-2 text-sm md:gap-4"
        data-testid="shopping-promise-return"
      >
        <IconReturn class="size-4 md:size-6" />
        {{ $t('footer_promises.return_policy') }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCurrentShop } from '#storefront/composables'

const currentShop = useCurrentShop()
</script>
