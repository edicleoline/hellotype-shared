import Result from './../../../domain/result'
import { PhoneEntity } from '../entities'

export interface PhoneDataSource {
  findOrCreate(phoneNumber: string): Promise<Result<PhoneEntity>>
}

export interface PhoneLocalDataSource {
  save(phone: PhoneEntity): Promise<Result<PhoneEntity>>

  find(param: string): Promise<Result<PhoneEntity | undefined>>
}
