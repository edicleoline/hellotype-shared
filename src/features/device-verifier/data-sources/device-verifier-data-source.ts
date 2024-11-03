import Result from './../../../domain/result'
import { DeviceVerifierStartEntity, MethodEntity } from '../entities'
import { IdentityEntity } from '../../identity/entities'

export interface DeviceVerifierDataSource {
  start(phoneId: string, deviceId: string, method?: string | undefined): Promise<Result<DeviceVerifierStartEntity>>

  verify(token: string, otpCode: string): Promise<Result<IdentityEntity | null>>

  methodsByDevice(deviceId: string, targetId: string): Promise<Result<MethodEntity[]>>
}

export interface DeviceVerifierLocalDataSource {
  saveStart(entity: DeviceVerifierStartEntity): Promise<Result<DeviceVerifierStartEntity>>

  findByTarget(targetId: string): Promise<Result<DeviceVerifierStartEntity | undefined>>
}
