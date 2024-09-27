interface ErrorResponseData {
  detail?: string;
}

interface ErrorResponse {
  data?: ErrorResponseData;
  status?: number;
  statusText?: string;
}

interface HelloworldError extends Error {
  response?: ErrorResponse;
}

export default class Result<T> {
  private constructor(public readonly data?: T, public readonly error?: HelloworldError) {
  }

  static success<T>(data: T): Result<T> {
    return new Result<T>(data)
  }

  static error<T>(error: Error): Result<T> {
    return new Result<T>(undefined, error)
  }

  isSuccess(): boolean {
    return this.error == null
  }

  isError(): boolean {
    return this.error != null
  }
}
