import { inject, injectable } from 'inversify'

import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { UserEntity } from '../../user/entities/user-entity'
import { AccountDataSource } from './account-data-source'

@injectable()
export class RemoteAccountDataSource implements AccountDataSource {
  constructor(
    @inject('RestApiClient') private restApiClient: RestApiClient
  ) {
  }

  async me(): Promise<UserEntity> {
    return await this.restApiClient.get<UserEntity>('/me')
  }
}
