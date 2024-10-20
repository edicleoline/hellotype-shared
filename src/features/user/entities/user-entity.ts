export class UserEntity {
  id: string
  identityId: string
  firstName: string

  constructor(data: Partial<UserEntity>) {
    this.id = data.id!
    this.identityId = data.identityId!
    this.firstName = data.firstName!
  }
}
