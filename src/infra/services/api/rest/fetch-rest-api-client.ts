import { inject, injectable } from 'inversify'
import { ApiConfig } from '../../../../services/api/rest/api-config'
import { RestApiClient } from '../../../../services/api/rest/rest-api-client'
import camelcaseKeys from 'camelcase-keys'
import Result from '../../../../domain/result'
import { ErrorCode } from '../../../../error'
import { TokenCache } from '../../../../services/api/token-cache'
import TYPES from '../../../../types'

type RequestParams = Record<string, any>

export const config: ApiConfig = {
  baseUrl: 'http://192.168.0.10:8000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
}

@injectable()
export class FetchRestApiClient implements RestApiClient {
  private isRefreshing = false
  private refreshPromise: Promise<Result<void>> | null = null
  private queue: Array<() => void> = []
  private maxRefreshAttempts = 3
  private refreshAttempts = 0

  constructor(@inject(TYPES.TokenCache) private tokenCache: TokenCache) {
  }

  private async tryAgain<T>(fn: () => Promise<Result<T>>, retries: number = 3, delay: number = 1000): Promise<Result<T>> {
    let attempt = 0
    let result: Result<T> = Result.error({
      status: 500,
      statusText: 'Unknown error'
    })

    while (attempt < retries) {
      result = await fn()

      if (result.isSuccess()) {
        return result
      }

      if (result.error?.data?.code === ErrorCode.NetworkError) {
        attempt++
        if (attempt >= retries) {
          // console.warn(`Max retries reached: ${attempt}. Aborting further attempts.`)
          break
        }
        console.log(`Attempt ${attempt} failed due to network error. Retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      } else {
        return result
      }
    }

    return result
  }

  private async request<T>(method: string, url: string, body?: any, params?: RequestParams): Promise<Result<T>> {
    const headers: Record<string, string> = { ...config.headers }

    if (this.tokenCache?.getAccessToken()) {
      headers['Authorization'] = `Bearer ${this.tokenCache?.getAccessToken()}`
    }

    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url += `?${queryString}`
    }

    try {
      const response = await fetch(`${config.baseUrl}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      })

      const data = await response.json()

      if (url.includes('/auth/authenticate')) {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token

        if (accessToken) this.tokenCache.setAccessToken(accessToken)
        if (refreshToken) this.tokenCache.setRefreshToken(refreshToken)
      }

      if (!response.ok) {
        if (response.status === 401 && data?.code == 1023 && this.tokenCache?.getRefreshToken()) {
          return this.handleUnauthorized<T>(method, url, body, params)
        }

        return Result.error<T>({
          status: response.status,
          statusText: response.statusText,
          data: camelcaseKeys(data, { deep: true })
        })
      }

      return Result.success<T>(camelcaseKeys(data, { deep: true }))

    } catch (err) {
      if (err instanceof TypeError) {
        return Result.error<T>({
          status: 503,
          statusText: 'Network Error',
          data: {
            detail: 'You are offline or there was a connection problem.',
            code: ErrorCode.NetworkError
          }
        })
      }

      return Result.error<T>({
        status: 500,
        statusText: 'Internal Server Error',
        data: {
          detail: 'An unexpected error occurred.',
          code: ErrorCode.InternalServerError
        }
      })
    }
  }

  private async handleUnauthorized<T>(method: string, url: string, body?: any, params?: RequestParams): Promise<Result<T>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshAttempts = 0
      this.refreshPromise = this.refreshAccessToken()

      try {
        await this.refreshPromise
        return this.request<T>(method, url, body, params)
      } catch (err) {
        console.error('Error during token refresh:', err)
        this.clearQueue()
        return Result.error<T>({
          status: 401,
          statusText: 'Unauthorized',
          data: {
            detail: 'Failed to refresh token.',
            code: ErrorCode.Unauthorized
          }
        })
      } finally {
        this.isRefreshing = false
        this.refreshPromise = null
        this.processQueue()
      }
    } else {
      return new Promise<Result<T>>((resolve, reject) => {
        this.queue.push(async () => {
          try {
            const result = await this.request<T>(method, url, body, params)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })
      })
    }
  }

  private clearQueue() {
    while (this.queue.length > 0) {
      const request = this.queue.shift()
      if (request) request()
    }
  }

  private async refreshAccessToken(): Promise<Result<void>> {
    if (this.refreshAttempts >= this.maxRefreshAttempts) {
      console.error('Max refresh attempts reached. No further attempts will be made.')
      this.isRefreshing = false
      return Result.error({
        status: 401,
        statusText: 'Unauthorized',
        data: {
          detail: 'Max refresh attempts reached. Please login again.',
          code: ErrorCode.Unauthorized
        }
      })
    }

    const refreshToken = this.tokenCache?.getRefreshToken()

    if (!refreshToken) {
      this.isRefreshing = false
      return Result.error({
        status: 401,
        statusText: 'Unauthorized',
        data: {
          detail: 'No refresh token available.',
          code: ErrorCode.Unauthorized
        }
      })
    }

    this.refreshAttempts++

    return await this.tryAgain(async () => {
      const response = await fetch(`${config.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh_token: this.tokenCache.getRefreshToken() })
      })

      if (response.status === 404) {
        console.error('Refresh token endpoint not found (404). Aborting token refresh attempts.')
        this.isRefreshing = false
        return Result.error({
          status: 404,
          statusText: 'Not Found',
          data: {
            detail: 'Refresh token endpoint not found.',
            code: ErrorCode.EndpointNotFound
          }
        })
      }

      if (!response.ok) {
        if (response.status === 401) {
          return Result.error({
            status: 401,
            statusText: 'Unauthorized',
            data: {
              detail: 'Failed to refresh token due to unauthorized access.',
              code: ErrorCode.Unauthorized
            }
          })
        }
        return Result.error({
          status: response.status,
          statusText: response.statusText,
          data: {
            detail: 'Failed to refresh token.',
            code: ErrorCode.Unknown
          }
        })
      }

      const data: any = await response.json()

      const accessToken = data.access_token
      const refreshToken = data.refresh_token

      if (accessToken) this.tokenCache.setAccessToken(accessToken)
      if (refreshToken) this.tokenCache.setRefreshToken(refreshToken)

      return Result.success<void>(undefined)
    })
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const request = this.queue.shift()
      if (request) request()
    }
  }

  public async get<T>(url: string, params?: RequestParams): Promise<Result<T>> {
    return this.tryAgain(() => this.request<T>('GET', url, undefined, params))
  }

  public async post<T>(url: string, data?: any): Promise<Result<T>> {
    return this.tryAgain(() => this.request<T>('POST', url, data))
  }

  public async put<T>(url: string, data?: any): Promise<Result<T>> {
    return this.tryAgain(() => this.request<T>('PUT', url, data))
  }

  public async delete<T>(url: string): Promise<Result<T>> {
    return this.tryAgain(() => this.request<T>('DELETE', url))
  }
}
