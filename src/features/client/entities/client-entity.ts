export class ClientEntity {
  id: string

  constructor(data: Partial<ClientEntity>) {
    this.id = data.id!
  }
}
