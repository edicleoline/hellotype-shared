export class IdentityEntity {
  id: string

  constructor(data: Partial<IdentityEntity>) {
    this.id = data.id!
  }
}
