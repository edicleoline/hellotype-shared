export class PhoneVerifierStartEntity {
  phoneId: string
  method: string
  token: string
  otpCodeLen: number


  constructor(data: Partial<PhoneVerifierStartEntity>) {
    this.phoneId = data.phoneId!
    this.method = data.method!
    this.token = data.token!
    this.otpCodeLen = data.otpCodeLen!
  }
}
