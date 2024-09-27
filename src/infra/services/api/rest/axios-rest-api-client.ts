import { injectable } from 'inversify'
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { config } from '../../../../services/api/rest/api-config'
import { RestApiClient } from '../../../../services/api/rest/rest-api-client'
import camelcaseKeys from 'camelcase-keys'

type RequestParams = Record<string, any>

@injectable()
export class AxiosRestApiClient implements RestApiClient {
  private client: AxiosInstance

  constructor() {
    const headers: Record<string, string> = { ...config.headers }

    if (config.token) {
      headers['Authorization'] = `Bearer ${config.token}`
    }

    this.client = axios.create({
      baseURL: config.baseUrl,
      headers
    })

    this.client.interceptors.request.use(this.handleRequest.bind(this))

    this.client.interceptors.response.use(this.handleResponse.bind(this))
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    if (response.data && typeof response.data === 'object') {
      response.data = camelcaseKeys(response.data, { deep: true })
    }

    if (response.config.url === '/auth/authenticate') {
      const token = response.data.accessToken

      if (token) {
        config.token = token
      }
    }

    return response
  }

  private handleRequest(request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
    request.headers = request.headers || {}

    if (config.token) {
      request.headers['Authorization'] = `Bearer ${config.token}`
    }

    return request
  }

  public async get<T>(url: string, params?: RequestParams): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, { params })
    return response.data
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data)
    return response.data
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url)
    return response.data
  }
}
