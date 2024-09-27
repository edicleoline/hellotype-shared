import { inject, injectable } from 'inversify'

import UseCase from '../../../domain/use-case'
import { AuthDataSource } from '../data-sources/auth-data-source'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity } from '../entities/authenticate-response-entity'

interface Request {
  token: string
  password?: string
  user?: UserEntity
}

@injectable()
export default class AuthenticateUseCase extends UseCase<Request, AuthenticateResponseEntity | null> {
  constructor(
    @inject('RemoteAuthDataSource') private remoteAuthDataSource: AuthDataSource,
    @inject('IoDispatcher') ioDispatcher: (fn: () => Promise<AuthenticateResponseEntity | null>) => Promise<AuthenticateResponseEntity | null>
  ) {
    super(ioDispatcher)
  }

  protected async execute(request: Request): Promise<AuthenticateResponseEntity | null> {
    return await this.remoteAuthDataSource.authenticate(request.token, request.password, request.user)
  }
}
