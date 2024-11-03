export class DeviceVerifierStartEntity {
  verificationType: string
  method?: string | undefined | null
  targetId: string
  token: string
  otpCodeLen?: number | undefined | null
  params?: { [key: string]: any }

  constructor(data: Partial<DeviceVerifierStartEntity>) {
    this.verificationType = data.verificationType!
    this.method = data.method!
    this.targetId = data.targetId!
    this.token = data.token!
    this.otpCodeLen = data.otpCodeLen!
    this.params = data.params!
  }
}
