export interface ErrorResponse {
  data?: {
    code: number
    detail: string
    params?: {}
  }
  status?: number
  statusText?: string
}

export default class Result<T> {
  private constructor(public readonly data?: T, public readonly error?: ErrorResponse) {
  }

  static success<T>(data: T): Result<T> {
    return new Result<T>(data)
  }

  static error<T>(error: ErrorResponse | undefined): Result<T> {
    return new Result<T>(undefined, error)
  }

  isSuccess(): boolean {
    return this.error == null
  }

  isError(): boolean {
    return this.error != null
  }
}
