import Result from './../../../domain/result'
import { MethodEntity, PhoneVerifierStartEntity } from '../entities'

export interface PhoneVerifierDataSource {
  start(phoneId: string, deviceId: string, method: string): Promise<Result<PhoneVerifierStartEntity>>

  verify(token: string, otpCode: string): Promise<Result<void>>

  methodsByDevice(deviceId: string): Promise<Result<MethodEntity[]>>
}

export interface PhoneVerifierLocalDataSource {
  saveStart(entity: PhoneVerifierStartEntity): Promise<Result<PhoneVerifierStartEntity>>

  findByPhone(phoneId: string): Promise<Result<PhoneVerifierStartEntity | undefined>>
}
