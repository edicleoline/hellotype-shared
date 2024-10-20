import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { AuthDataSource } from './auth-data-source'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity, IdentifyResponseEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export class RemoteAuthDataSource implements AuthDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async identify(identifier: string): Promise<Result<IdentifyResponseEntity>> {
    return await this.restApiClient.post<IdentifyResponseEntity>('/auth/identify', { identifier })
  }

  async authenticate(token: string, password?: string, user?: UserEntity):
    Promise<Result<AuthenticateResponseEntity>> {
    return await this.restApiClient.post<AuthenticateResponseEntity>('/auth/authenticate', {
      token,
      password: password || null,
      user: user || null
    })
  }
}
