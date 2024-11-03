import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { DeviceVerifierDataSource } from './device-verifier-data-source'
import { DeviceVerifierStartEntity, MethodEntity } from '../entities'
import TYPES from '../../../types'
import { IdentityEntity } from '../../identity/entities'

@injectable()
export class RemoteDeviceVerifierDataSource implements DeviceVerifierDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async start(targetId: string, deviceId: string, method: string): Promise<Result<DeviceVerifierStartEntity>> {
    return await this.restApiClient.post<DeviceVerifierStartEntity>(`/device/verifier/start`, {
      target_id: targetId,
      device_id: deviceId,
      method: method
    })
  }

  async verify(token: string, otpCode: string): Promise<Result<IdentityEntity | null>> {
    return await this.restApiClient.post<IdentityEntity | null>(`/device/verifier/verify`, {
      token,
      otp_code: otpCode
    })
  }

  async methodsByDevice(deviceId: string, targetId: string): Promise<Result<MethodEntity[]>> {
    return await this.restApiClient.get<MethodEntity[]>(`/device/${deviceId}/verifier/target/${targetId}/method`)
  }
}
