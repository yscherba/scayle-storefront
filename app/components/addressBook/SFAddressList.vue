<template>
  <div v-if="currentPage <= totalPageCount" class="flex flex-col items-center">
    <ul class="w-full">
      <li v-for="address in itemsBatch"
        :key="address.id"
        class="mb-6 last-of-type:mb-0"
      >
        <SFAddressCard :address="address" />
      </li>
    </ul>
    <SFPagination
      v-if="totalPageCount > 1"
      :total-page-count="totalPageCount"
      class="mt-10"
    />
  </div>
  <SFEmptyState
    v-else
    :title="$t('address_list.no_orders.title')"
    :description="$t('address_list.no_orders.description')"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { ShopUserAddress } from '@scayle/storefront-nuxt'
  import SFAddressCard from '~/components/addressBook/SFAddressCard.vue'
  import { SFPagination } from '#storefront-ui/components'
  import { useRoute } from '#app/composables/router'
  import SFEmptyState from '~/components/SFEmptyState.vue'

  const ADDRESSES_PER_PAGE = 8

  const route = useRoute()

  const { items, count } = defineProps<{
    /**
     * List of addresses to display.
     */
    items: ShopUserAddress[] | null
    /**
     * Total number of addresses available. Used for pagination calculations.
     */
    count: number
  }>()

  const currentPage = computed(() => Number(route.query.page) || 1)
  const totalPageCount = computed(() => Math.ceil(count / ADDRESSES_PER_PAGE))

  const itemsBatch = computed(() => {
    const startIndex = (currentPage.value - 1) * ADDRESSES_PER_PAGE
    return items?.slice(startIndex, startIndex + ADDRESSES_PER_PAGE)
  })
</script>
