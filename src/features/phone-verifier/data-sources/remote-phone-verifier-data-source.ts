import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { PhoneVerifierDataSource } from './phone-verifier-data-source'
import { MethodEntity, PhoneVerifierStartEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export class RemotePhoneVerifierDataSource implements PhoneVerifierDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async start(phoneId: string, deviceId: string, method: string): Promise<Result<PhoneVerifierStartEntity>> {
    return await this.restApiClient.post<PhoneVerifierStartEntity>(`/phone/verifier/start`, {
      phone_id: phoneId,
      device_id: deviceId,
      method: method
    })
  }

  async verify(token: string, otpCode: string): Promise<Result<void>> {
    return await this.restApiClient.post<undefined>(`/phone/verifier/verify`, {
      token,
      otp_code: otpCode
    })
  }

  async methodsByDevice(deviceId: string): Promise<Result<MethodEntity[]>> {
    return await this.restApiClient.get<MethodEntity[]>(`/phone/verifier/method/device/${deviceId}`)
  }
}
