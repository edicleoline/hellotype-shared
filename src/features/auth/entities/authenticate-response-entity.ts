export class AuthenticateResponseEntity {
  accessToken: string
  refreshToken: string

  constructor(data: Partial<AuthenticateResponseEntity>) {
    this.accessToken = data.accessToken!
    this.refreshToken = data.refreshToken!
  }

  toJSON(): Record<string, any> {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }
  }

  static fromApiResponse(data: any): AuthenticateResponseEntity {
    return new AuthenticateResponseEntity({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })
  }
}
