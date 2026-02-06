import type { RpcContext } from '@scayle/storefront-nuxt'
import { SendApiRequest } from './sendApiRequest'

export class CreateAddressApi {
  private apiClient: SendApiRequest

  constructor(context: RpcContext) {
    this.apiClient = new SendApiRequest(context)
  }

  public async createAddress(shopId: number, addressData: Record<string, any>) {
    return await this.makeActualRequest(shopId, addressData)
  }

  private async makeActualRequest(shopId: number, addressData: Record<string, any>) {
    return await this.apiClient.sendRequest(
      () => fetch(`${this.apiClient.baseURL}/api/oauth/customer/address`, {
        method: 'POST',
        headers: {
          ...this.apiClient.headers,
          'X-Shop-Id': shopId.toString()
        },
        body: JSON.stringify(addressData)
      })
    )
  }
}