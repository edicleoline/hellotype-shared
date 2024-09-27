export class UserEntity {
  id: number
  identityId: string
  firstName: string

  constructor(data: Partial<UserEntity>) {
    this.id = data.id!
    this.identityId = data.identityId!
    this.firstName = data.firstName!
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      firstName: this.firstName
    }
  }

  static fromApiResponse(data: any): UserEntity {
    return new UserEntity({
      id: data.id,
      firstName: data.firstName
    })
  }
}
