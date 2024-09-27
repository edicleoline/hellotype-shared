export class IdentifyResponseEntity {
  accessToken: string
  method: string

  constructor(data: Partial<IdentifyResponseEntity>) {
    this.accessToken = data.accessToken!
    this.method = data.method!
  }
}
