import { computed, useScript } from '#imports'
import { useCurrentShop, useRpc } from '#storefront/composables'

export function useCheckoutWebComponent() {
  const currentShop = useCurrentShop()
  const script = useScript(
    `${currentShop.value?.checkout.host}/frontend/checkout-wc/js?appId=${currentShop.value?.shopId}`,
    {
      key: 'checkout-wc',
      bundle: false,
      tagPriority: 'high',
      warmupStrategy: 'preload',
      trigger: 'client',
    },
  )
  const { data, refresh, status } = useRpc(
    'getCheckoutToken',
    'getCheckoutToken',
    undefined,
    { server: false, dedupe: 'defer' },
  )

  return {
    ...script,
    accessToken: computed(() => data.value?.accessToken),
    checkoutJwt: computed(() => data.value?.checkoutJwt),
    refreshToken: refresh,
    status,
  }
}
