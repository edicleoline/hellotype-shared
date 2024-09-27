import { inject, injectable } from 'inversify'

import UseCase from '../../../domain/use-case'
import { UserEntity } from '../../user/entities/user-entity'
import { AccountDataSource } from '../data-sources/account-data-source'

@injectable()
export default class MeUseCase extends UseCase<string, UserEntity> {
  constructor(
    @inject('RemoteAccountDataSource') private remoteAccountDataSource: AccountDataSource,
    @inject('IoDispatcher') ioDispatcher: (fn: () => Promise<UserEntity>) => Promise<UserEntity>
  ) {
    super(ioDispatcher)
  }

  protected async execute(): Promise<UserEntity> {
    return await this.remoteAccountDataSource.me()
  }
}
