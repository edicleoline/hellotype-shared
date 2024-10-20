import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { ClientDataSource } from '../data-sources/client-data-source'
import { ClientEntity, DeviceEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class InstallUseCase extends UseCase<DeviceEntity, Result<ClientEntity>> {
  constructor(
    @inject(TYPES.RemoteClientDataSource) private remoteClientDataSource: ClientDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<ClientEntity>>) => Promise<Result<ClientEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: DeviceEntity): Promise<Result<ClientEntity>> {
    return await this.remoteClientDataSource.install(parameters)
  }
}
