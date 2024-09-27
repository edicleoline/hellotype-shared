export class AuthenticateResponseEntity {
  accessToken: string
  refreshToken: string

  constructor(data: Partial<AuthenticateResponseEntity>) {
    this.accessToken = data.accessToken!
    this.refreshToken = data.refreshToken!
  }
}
