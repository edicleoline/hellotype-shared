import Result from './../../../domain/result'
import { UserEntity } from '../../user/entities/user-entity'

export interface AccountDataSource {
  me(id?: string): Promise<Result<UserEntity>>
}
