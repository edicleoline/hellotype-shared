import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import {
  DeviceVerifierDataSource,
  DeviceVerifierLocalDataSource
} from '../data-sources/device-verifier-data-source'
import { DeviceVerifierStartEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class StartUseCase extends UseCase<Parameters, Result<DeviceVerifierStartEntity>> {
  constructor(
    @inject(TYPES.RemoteDeviceVerifierDataSource) private remoteDeviceVerifierDataSource: DeviceVerifierDataSource,
    @inject(TYPES.LocalDeviceVerifierDataSource) private localDeviceVerifierDataSource: DeviceVerifierLocalDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<DeviceVerifierStartEntity>>) => Promise<Result<DeviceVerifierStartEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: Parameters): Promise<Result<DeviceVerifierStartEntity>> {
    const result = await this.remoteDeviceVerifierDataSource.start(
      parameters.targetId,
      parameters.deviceId,
      parameters.method
    )

    if (result.isSuccess() && result?.data) {
      this.localDeviceVerifierDataSource.saveStart({
        verificationType: 'phone',
        method: parameters.method,
        targetId: parameters.targetId,
        token: result?.data?.token,
        otpCodeLen: result?.data?.otpCodeLen,
        params: result?.data?.params || {}
      }).then()
    }

    return result
  }
}

interface Parameters {
  targetId: string
  deviceId: string
  method?: string | undefined
}
