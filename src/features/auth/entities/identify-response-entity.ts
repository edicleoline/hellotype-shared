export class IdentifyResponseEntity {
  accessToken: string
  method: string

  constructor(data: Partial<IdentifyResponseEntity>) {
    this.accessToken = data.accessToken!
    this.method = data.method!
  }

  toJSON(): Record<string, any> {
    return {
      accessToken: this.accessToken,
      method: this.method
    }
  }

  static fromApiResponse(data: any): IdentifyResponseEntity {
    return new IdentifyResponseEntity({
      accessToken: data.accessToken,
      method: data.method
    })
  }
}
