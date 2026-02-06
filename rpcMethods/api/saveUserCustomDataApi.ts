import type { RpcContext } from '@scayle/storefront-nuxt'
import { SendApiRequest } from './sendApiRequest'

export class SaveUserCustomDataApi {
  private apiClient: SendApiRequest

  constructor(context: RpcContext) {
    this.apiClient = new SendApiRequest(context)
  }

  public async updateCustomData(shopId: number, customData: Record<string, any>) {
    return await this.makeActualRequest(shopId, customData)
  }

  private async makeActualRequest(shopId: number, customData: Record<string, any>) {
    return await this.apiClient.sendRequest(
      () => fetch(`${this.apiClient.baseURL}/api/oauth/customer/custom-data`, {
        method: 'PUT',
        headers: {
          ...this.apiClient.headers,
          'X-Shop-Id': shopId.toString()
        },
        body: JSON.stringify(customData)
      })
    )
  }
}