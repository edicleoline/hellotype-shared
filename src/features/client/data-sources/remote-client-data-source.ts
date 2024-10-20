import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import { RestApiClient } from '../../../services/api/rest/rest-api-client'
import { ClientDataSource } from './client-data-source'
import { ClientEntity, DeviceEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export class RemoteClientDataSource implements ClientDataSource {
  constructor(
    @inject(TYPES.RestApiClient) private restApiClient: RestApiClient
  ) {
  }

  async install(device: DeviceEntity): Promise<Result<ClientEntity>> {
    return await this.restApiClient.post<ClientEntity>(`/client/install`, {
      model: device?.model,
      os: device?.os,
      os_version: device?.osVersion
    })
  }
}
