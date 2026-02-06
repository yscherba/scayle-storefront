<template>
  <SFLocalizedLink
    :to="getAddressEditRoute(address.id)"
    :data-testid="`address-detail-card-${address.id}`"
    :aria-label="$t('address_card.go_to_address', { id: address.id })"
    raw
    class="flex items-center justify-between rounded-xl border border-gray-400 bg-white p-5"
  >
    <div class="flex flex-col text-md text-secondary">
      <div class="mb-3 flex items-center gap-2.5">
        <SFHeadline
          class="text-primary"
          data-testid="address-item-headline"
          size="md"
          tag="h3"
        >
          {{ $t('address_card.title', { id:address.id }) }}
        </SFHeadline>
      </div>
      <span class="mb-1">
        {{ $t('address_card.city', { city:address.city }) }}
      </span>
      <span class="mb-1">
        {{ $t('address_card.country', { country:address.country }) }}
      </span>
      <span class="mb-1">
        {{ $t('address_card.houseNumber', { houseNumber:address.houseNumber }) }}
      </span>
      <span class="mb-1">
        {{ $t('address_card.state', { state:address.state }) }}
      </span>
      <span class="mb-1">
        {{ $t('address_card.street', { street:address.street }) }}
      </span>
      <span class="mb-1">
        {{ $t('address_card.zipCode', { zipCode:address.zipCode }) }}
      </span>
    </div>
    <SFButton
      :to="getAddressEditRoute(address.id)"
      :data-testid="`go-to-address-detail-${address.id}`"
      :aria-label="$t('order_card.go_to_address', { id: address.id })"
      variant="tertiary"
      class="mr-0.5 !size-10 !p-0"
    >
      <IconChevronRight class="size-4" />
    </SFButton>
  </SFLocalizedLink>
</template>

<script setup lang="ts">
  import { SFHeadline, SFButton } from '#storefront-ui/components'
  import { useRouteHelpers } from '~/composables'
  import SFLocalizedLink from '../SFLocalizedLink.vue'
  import type { ShopUserAddress } from '@scayle/storefront-nuxt'
  const { getAddressEditRoute } = useRouteHelpers()
  const { address } = defineProps<{
    address: ShopUserAddress
  }>()

</script>
