export class MethodEntity {
  id?: string
  key: string
  title: string
  label: string
  params?: { key: string; value: string }
  lastRequestAt: Date
  cooldownSeconds: number
  attemptCount: number
  icon?: string

  constructor(data: Partial<MethodEntity>) {
    this.id = data.id!
    this.key = data.key!
    this.title = data.title!
    this.label = data.label!
    this.params = data.params!
    this.lastRequestAt = data.lastRequestAt!
    this.cooldownSeconds = data.cooldownSeconds!
    this.attemptCount = data.attemptCount!
    this.icon = data.icon!
  }
}
