import { UserEntity } from '../../user/entities/user-entity'

export interface AccountDataSource {
  me(): Promise<UserEntity>
}
