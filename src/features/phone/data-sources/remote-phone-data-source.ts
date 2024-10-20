import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { PhoneDataSource } from './phone-data-source'
import { PhoneEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export class RemotePhoneDataSource implements PhoneDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async findOrCreate(phoneNumber: string): Promise<Result<PhoneEntity>> {
    return await this.restApiClient.post<PhoneEntity>(`/phone`, {
      phone_number: phoneNumber
    })
  }
}
