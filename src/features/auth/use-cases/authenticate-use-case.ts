import { inject, injectable } from 'inversify'

import Result from './../../../domain/result'
import UseCase from '../../../domain/use-case'
import { AuthDataSource } from '../data-sources/auth-data-source'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class AuthenticateUseCase extends UseCase<AuthenticateParameter, Result<AuthenticateResponseEntity>> {
  constructor(
    @inject(TYPES.RemoteAuthDataSource) private remoteAuthDataSource: AuthDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<AuthenticateResponseEntity>>)
      => Promise<Result<AuthenticateResponseEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: AuthenticateParameter): Promise<Result<AuthenticateResponseEntity>> {
    return await this.remoteAuthDataSource.authenticate(parameters.token, parameters.password!, parameters.user!)
  }
}

interface AuthenticateParameter {
  token: string
  password?: string | null | undefined
  user?: UserEntity | null | undefined
}
