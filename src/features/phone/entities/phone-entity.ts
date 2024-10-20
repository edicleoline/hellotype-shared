export class PhoneEntity {
  id: string
  phoneNumber: string

  constructor(data: Partial<PhoneEntity>) {
    this.id = data.id!
    this.phoneNumber = data.phoneNumber!
  }
}
