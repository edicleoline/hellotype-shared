export class DeviceEntity {
  brand?: string | null | undefined
  designName?: string | null | undefined
  deviceName?: string | null | undefined
  deviceYearClass?: number | null | undefined
  manufacturer?: string | null | undefined
  modelId?: string | null | undefined
  modelName?: string | null | undefined
  osBuildFingerprint?: string | null | undefined
  osBuildId?: string | null | undefined
  osInternalBuildId?: string | null | undefined
  osName?: string | null | undefined
  osVersion?: string | null | undefined
  platformApiLevel?: number | null | undefined
  productName?: string | null | undefined
  totalMemory?: number | null | undefined

  constructor(data: Partial<DeviceEntity>) {
    this.brand = data.brand!
    this.designName = data.designName!
    this.deviceName = data.deviceName!
    this.deviceYearClass = data.deviceYearClass!
    this.manufacturer = data.manufacturer!
    this.modelId = data.modelId!
    this.modelName = data.modelName!
    this.osBuildFingerprint = data.osBuildFingerprint!
    this.osBuildId = data.osBuildId!
    this.osInternalBuildId = data.osInternalBuildId!
    this.osName = data.osName!
    this.osVersion = data.osVersion!
    this.platformApiLevel = data.platformApiLevel!
    this.productName = data.productName!
    this.totalMemory = data.totalMemory!
  }
}
