import { ErrorResponse, ErrorResponseData } from 'hellotype-shared/domain/result';

export class ApiError extends Error implements ErrorResponse {
  constructor(
    public status: number,
    public statusText: string,
    public data?: ErrorResponseData
  ) {
    super(`Error ${status}: ${statusText}`)
    this.name = 'ApiError'
  }
}
