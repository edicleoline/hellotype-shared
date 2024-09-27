import { inject, injectable } from 'inversify'

import UseCase from '../../../domain/use-case'
import { AuthDataSource } from '../data-sources/auth-data-source'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity } from '../entities/authenticate-response-entity'

interface AuthenticateParameter {
  token: string
  password?: string
  user?: UserEntity
}

@injectable()
export default class AuthenticateUseCase extends UseCase<AuthenticateParameter, AuthenticateResponseEntity | null> {
  constructor(
    @inject('RemoteAuthDataSource') private remoteAuthDataSource: AuthDataSource,
    @inject('IoDispatcher') ioDispatcher: (fn: () => Promise<AuthenticateResponseEntity | null>) => Promise<AuthenticateResponseEntity | null>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: AuthenticateParameter): Promise<AuthenticateResponseEntity | null> {
    return await this.remoteAuthDataSource.authenticate(parameters.token, parameters.password, parameters.user)
  }
}
