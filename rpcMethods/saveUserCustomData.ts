import { defineRpcHandler } from '@scayle/storefront-nuxt'
import type { RpcHandler, RpcContext } from '@scayle/storefront-nuxt'

export const saveUserCustomData: RpcHandler<{ isWholesaler: boolean, companyName: string }, { success: boolean}> = defineRpcHandler(async function saveUserCustomData(
  params: { isWholesaler: boolean, companyName: string  },
  context: RpcContext,
) {
  const { isWholesaler, companyName } = params
  try {
    await context.sapiClient.customers.update({
      customData: {
        isWholesaler,
        companyName
      }
    })
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
  } catch (apiError) {
    try {
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
    } catch (contextError) {
      throw apiError
    }
  }
})