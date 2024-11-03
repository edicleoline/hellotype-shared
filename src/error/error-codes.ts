export enum ErrorCode {
  NetworkError = 1,
  InternalServerError = 2,
  InvalidTokenError = 1023,
  InvalidLoginOrPassword = 1020,
  Unauthorized = 1022,
  EndpointNotFound = 2010,
  Unknown = 5000,
  IncorrectOtpCode = 1040,
  OtpRequestLimitError = 1046,
  Timeout = 8
}
