import { defineRpcHandler } from '@scayle/storefront-nuxt'
import type { RpcHandler, RpcContext } from '@scayle/storefront-nuxt'
import { SaveUserCustomDataApi } from '../api/saveUserCustomDataApi'

export const saveUserCustomData: RpcHandler<{ isWholesaler: boolean, companyName: string }, { success: boolean}> = defineRpcHandler(async function saveUserCustomData(
  params: { isWholesaler: boolean, companyName: string  },
  context: RpcContext,
) {
  const { isWholesaler, companyName } = params

  try {
    const client = new SaveUserCustomDataApi(context)
    const result = await client.updateCustomData(context.shopId, {
      isWholesaler,
      companyName
    })

    // Update local user context
    const updatedUser = {
      ...context.user,
      customData: {
        ...context.user?.customData,
        isWholesaler,
        companyName
      }
    }

    context.updateUser?.(updatedUser)
    return { success: true }
  } catch (error) {
    context.log?.error('Error saving user custom data:', error)
    throw error
  }
})