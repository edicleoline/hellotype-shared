export class IdentifyResponseEntity {
  accessToken: string
  redirect?: string

  constructor(data: Partial<IdentifyResponseEntity>) {
    this.accessToken = data.accessToken!
    this.redirect = data.redirect!
  }
}
