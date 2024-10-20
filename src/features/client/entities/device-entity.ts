export class DeviceEntity {
  model?: string | null | undefined
  os?: string | null | undefined
  osVersion?: string | null | undefined

  constructor(data: Partial<DeviceEntity>) {
    this.model = data.model!
    this.os = data.os!
    this.osVersion = data.osVersion!
  }
}
