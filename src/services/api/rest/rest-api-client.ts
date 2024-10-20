import Result from './../../../domain/result'

export interface RestApiClient {
  get<T>(url: string, params?: any): Promise<Result<T>>

  post<T>(url: string, data?: any): Promise<Result<T>>

  put<T>(url: string, data?: any): Promise<Result<T>>

  delete<T>(url: string): Promise<Result<T>>
}
