import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { DeviceVerifierDataSource } from '../data-sources/device-verifier-data-source'
import { MethodEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class MethodsByDeviceUseCase extends UseCase<Parameters, Result<MethodEntity[]>> {
  constructor(
    @inject(TYPES.RemoteDeviceVerifierDataSource) private remotePhoneVerifierDataSource: DeviceVerifierDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<MethodEntity[]>>) => Promise<Result<MethodEntity[]>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: Parameters): Promise<Result<MethodEntity[]>> {
    return await this.remotePhoneVerifierDataSource.methodsByDevice(parameters.deviceId, parameters.targetId)
  }
}

interface Parameters {
  targetId: string
  deviceId: string
}
