import type { RpcContext } from '@scayle/storefront-nuxt'

// HTTP Status Code constants
const HttpStatusCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
} as const

// FetchError class
class FetchError2 extends Error {
  response: Response
  data?: any

  constructor(response: Response, data?: any) {
    const message = `Failed to fetch ${response.url}. ${response.status} ${response.statusText}`
    super(message)
    this.response = response
    this.data = data
    this.name = 'FetchError'
    this.message = message
  }
}

// OAuth Client interface - simplified for this implementation
interface OAuthClient {
  refreshToken(params: { grant_type: string; refresh_token: string }): Promise<{
    access_token?: string
    refresh_token?: string
  }>
}

function getOAuthClient(context: RpcContext): OAuthClient {
  if (!context.oauth) {
    throw new Error('OAuth configuration is missing')
  }
  const { clientId, clientSecret, apiHost } = context.oauth
  const accessHeader = context.internalAccessHeader
  const requestHeaders = context.headers
  const host = requestHeaders.get('host')
  const userAgent = requestHeaders.get('user-agent')
  const contentType = requestHeaders.get('content-type')
  const ip = context.originalIp
  const additionalHeaders: Record<string, string> = {}

  if (ip) {
    additionalHeaders['x-original-client-ip'] = ip
  }
  if (userAgent) {
    additionalHeaders['x-original-user-agent'] = userAgent
  }
  if (host) {
    additionalHeaders['x-original-host'] = host
  }
  if (contentType) {
    additionalHeaders['x-original-content-type'] = contentType
  }
  if (accessHeader) {
    additionalHeaders['x-internal-access'] = accessHeader
  }

  // Return a simplified OAuth client - this would typically use the actual OAuthClient from the core
  return {
    async refreshToken(params) {
      const response = await fetch(`${apiHost}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...additionalHeaders
        },
        body: JSON.stringify({
          ...params,
          client_id: clientId,
          client_secret: clientSecret
        })
      })

      if (!response.ok) {
        throw new FetchError2(response)
      }

      return await response.json()
    }
  }
}

export class SendApiRequest {
  baseURL: string
  context: RpcContext
  additionalHeaders: Record<string, string>

  constructor(context: RpcContext) {
    this.baseURL = context.checkout.url
    this.context = context
    this.additionalHeaders = context.internalAccessHeader
      ? { "x-internal-access": context.internalAccessHeader }
      : {}
  }

  get headers() {
    return {
      Authorization: `Bearer ${this.context.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...this.additionalHeaders
    }
  }

  /**
   * Sends an API request and handles potential token refresh.
   *
   * @param request The request function to execute.
   * @param retry Whether to retry the request after a token refresh.
   *
   * @returns The parsed JSON response.
   *
   * @template BodyType The expected type of the response body.
   */
  async sendRequest(request: () => Promise<Response>, retry = true): Promise<any> {
    const response = await request()
    if (response.ok) {
      return await response.json()
    }
    if ((response.status === HttpStatusCode.UNAUTHORIZED && response.headers.get("WWW-Authenticate")?.includes(
      "invalid_token"
    ) || response.status === HttpStatusCode.FORBIDDEN) && this.context.accessToken && this.context.refreshToken) {
      if (retry) {
        const client = getOAuthClient(this.context)
        try {
          const tokens = await client.refreshToken({
            grant_type: "refresh_token",
            refresh_token: this.context.refreshToken
          })
          this.context.updateTokens({
            accessToken: tokens?.access_token,
            refreshToken: tokens?.refresh_token
          })
        } catch (e) {
          if (e instanceof FetchError2 && e.response.status === HttpStatusCode.UNAUTHORIZED) {
            this.context.log.debug(
              "Failed to refresh Checkout Token due to invalid refresh token. Deleting session"
            )
            await this.context.destroySession()
          } else {
            this.context.log.debug(
              "Failed to refresh Checkout Token for unknown reason."
            )
          }
          throw new FetchError2(response)
        }
        return await this.sendRequest(request, false)
      } else {
        this.context.log.debug("Invalid Checkout Token. Deleting session")
        await this.context.destroySession()
      }
    }
    throw new FetchError2(response)
  }
}