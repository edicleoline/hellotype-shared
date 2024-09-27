export interface ApiConfig {
  baseUrl: string
  headers?: Record<string, string>
  token?: string
}

export const config: ApiConfig = {
  baseUrl: '',
  headers: {}
}
