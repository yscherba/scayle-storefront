<template>
  <SFAsyncStatusWrapper :status="status">
    <SFEmptyState
      v-if="addressCount === 0"
      :title="$t('order_list.no_orders.title')"
      :description="$t('order_list.no_orders.description')"
    />
    <div v-else>
      <SFHeadline tag="h2" data-testid="orders-headline" class="mb-5 xl:mb-7">
        {{ $t('address_book_page.title') }}
        <span v-if="addressCount"
          class="ml-1 inline-flex h-4.5 items-center rounded-full bg-primary px-2 text-sm font-semibold leading-4 text-white"
        >
          {{ addressCount }}
        </span>
      </SFHeadline>
      <SFAddressList :items="addresses" :count="addressCount" />
    </div>
    <NuxtPage />
    <template #loading>
      <SFAddressSkeletonLoader />
    </template>
  </SFAsyncStatusWrapper>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useSeoMeta, definePageMeta } from '#imports'
  import SFEmptyState from '~/components/SFEmptyState.vue'
  import { useI18n } from '#i18n'
  import { NuxtPage } from '#components'
  import { useUser, useUserAddresses } from '#storefront/composables'
  import SFAddressSkeletonLoader from '~/components/addressBook/SFAddressSkeletonLoader.vue'
  import SFAsyncStatusWrapper from '~/components/SFAsyncStatusWrapper.vue'
  import SFAddressList from '~/components/addressBook/SFAddressList.vue'
  import { SFHeadline } from '#storefront-ui/components'

  const { t } = useI18n()
  const { status, user } = useUser()
  const { data: addresses, refresh } = useUserAddresses()
  const addressCount = computed(() => addresses?.value?.length ? addresses.value.length : 0)

  useSeoMeta({
    robots: 'noindex, nofollow',
    title: t('address_book_page.meta.title'),
    description: t('address_book_page.meta.description'),
  })

  defineOptions({ name: 'AddressListPage' })
  definePageMeta({ pageType: 'account_area:addresses' })
</script>