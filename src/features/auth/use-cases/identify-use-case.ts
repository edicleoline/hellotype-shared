import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import { AuthDataSource } from '../data-sources/auth-data-source'
import { IdentifyResponseEntity } from '../entities'
import Result from '../../../domain/result'
import TYPES from '../../../types'

@injectable()
export default class IdentifyUseCase extends UseCase<string, Result<IdentifyResponseEntity>> {
  constructor(
    @inject(TYPES.RemoteAuthDataSource) private remoteAuthDataSource: AuthDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<IdentifyResponseEntity>>) => Promise<Result<IdentifyResponseEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(identifier: string): Promise<Result<IdentifyResponseEntity>> {
    return await this.remoteAuthDataSource.identify(identifier)
  }
}
