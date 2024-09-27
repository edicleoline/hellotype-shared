import { inject, injectable } from 'inversify'

import UseCase from '../../../domain/use-case'
import { AuthDataSource } from '../data-sources/auth-data-source'
import { IdentifyResponseEntity } from '../entities/identify-response-entity'

@injectable()
export default class IdentifyUseCase extends UseCase<string, IdentifyResponseEntity | null> {
  constructor(
    @inject('RemoteAuthDataSource') private remoteAuthDataSource: AuthDataSource,
    @inject('IoDispatcher') ioDispatcher: (fn: () => Promise<IdentifyResponseEntity | null>) => Promise<IdentifyResponseEntity | null>
  ) {
    super(ioDispatcher)
  }

  protected async execute(identifier: string): Promise<IdentifyResponseEntity | null> {
    return await this.remoteAuthDataSource.identify(identifier)
  }
}
