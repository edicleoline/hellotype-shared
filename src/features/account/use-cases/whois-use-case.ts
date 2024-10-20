import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import UseCase from '../../../domain/use-case'
import { AccountDataSource } from '../data-sources/account-data-source'
import { UserEntity } from '../../user/entities/user-entity'
import TYPES from '../../../types'

@injectable()
export default class WhoisUseCase extends UseCase<string, Result<UserEntity>> {
  constructor(
    @inject(TYPES.RemoteAccountDataSource) private remoteAccountDataSource: AccountDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<UserEntity>>) => Promise<Result<UserEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(id?: string): Promise<Result<UserEntity>> {
    return await this.remoteAccountDataSource.me(id!)
  }
}
