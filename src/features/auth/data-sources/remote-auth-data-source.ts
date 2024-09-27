import { inject, injectable } from 'inversify'

import { AuthDataSource } from './auth-data-source'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity } from '../entities/authenticate-response-entity'
import { IdentifyResponseEntity } from '../entities/identify-response-entity'

@injectable()
export class RemoteAuthDataSource implements AuthDataSource {
  constructor(
    @inject('RestApiClient') private restApiClient: RestApiClient
  ) {
  }

  async identify(identifier: string): Promise<IdentifyResponseEntity> {
    return await this.restApiClient.post<IdentifyResponseEntity>('/auth/identify', { identifier: identifier })
  }

  async authenticate(token: string, password?: string, user?: UserEntity):
    Promise<AuthenticateResponseEntity | null> {
    return await this.restApiClient.post<AuthenticateResponseEntity | null>('/auth/authenticate', {
      token: token,
      password: password || null,
      user: user || null
    })
  }
}
