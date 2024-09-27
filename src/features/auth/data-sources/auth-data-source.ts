import { UserEntity } from '../../user/entities/user-entity'
import { AuthenticateResponseEntity } from '../entities/authenticate-response-entity'
import { IdentifyResponseEntity } from '../entities/identify-response-entity'

export interface AuthDataSource {
  identify(identifier: string): Promise<IdentifyResponseEntity | null>

  authenticate(token: string, password?: string, user?: UserEntity): Promise<AuthenticateResponseEntity | null>
}
