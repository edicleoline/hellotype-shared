export class MethodEntity {
  id: string
  method: string
  lastRequestAt: Date
  cooldownSeconds: number
  attemptCount: number

  constructor(data: Partial<MethodEntity>) {
    this.id = data.id!
    this.method = data.method!
    this.lastRequestAt = data.lastRequestAt!
    this.cooldownSeconds = data.cooldownSeconds!
    this.attemptCount = data.attemptCount!
  }
}
