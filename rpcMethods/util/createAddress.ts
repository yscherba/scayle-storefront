import { defineRpcHandler } from '@scayle/storefront-nuxt'
import type { RpcHandler, RpcContext } from '@scayle/storefront-nuxt'
import type { ShopUserAddress } from '@scayle/storefront-nuxt'
import { CreateAddressApi } from '../api/createAddressApi'

export const createAddress: RpcHandler<{ address: ShopUserAddress }, { success: boolean}> = defineRpcHandler(async function createAddress(
  params: { address: ShopUserAddress },
  context: RpcContext,
) {
  const { address } = params
    try {
      const client = new CreateAddressApi(context)
      const result = await client.createAddress(context.shopId, address)

      return { success: true }
    } catch (error) {
      context.log?.error('Error creating address:', error)
      throw error
    }
})