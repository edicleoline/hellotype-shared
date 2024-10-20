import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { UserEntity } from '../../user/entities/user-entity'
import { AccountDataSource } from './account-data-source'
import TYPES from '../../../types'

@injectable()
export class RemoteAccountDataSource implements AccountDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async me(id?: string): Promise<Result<UserEntity>> {
    return await this.restApiClient.get<UserEntity>('/me')
  }
}
