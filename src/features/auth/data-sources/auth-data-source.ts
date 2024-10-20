import Result from './../../../domain/result'
import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity, IdentifyResponseEntity } from '../entities'

export interface AuthDataSource {
  identify(identifier: string): Promise<Result<IdentifyResponseEntity>>

  authenticate(token: string, password?: string, user?: UserEntity): Promise<Result<AuthenticateResponseEntity>>
}
