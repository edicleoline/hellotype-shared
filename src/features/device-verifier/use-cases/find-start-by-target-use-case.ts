import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { DeviceVerifierLocalDataSource } from '../data-sources/device-verifier-data-source'
import { DeviceVerifierStartEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class FindStartByTargetUseCase extends UseCase<string, Result<DeviceVerifierStartEntity | undefined>> {
  constructor(
    @inject(TYPES.LocalDeviceVerifierDataSource) private localDeviceVerifierDataSource: DeviceVerifierLocalDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<DeviceVerifierStartEntity | undefined>>)
      => Promise<Result<DeviceVerifierStartEntity | undefined>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(targetId: string): Promise<Result<DeviceVerifierStartEntity | undefined>> {
    return await this.localDeviceVerifierDataSource.findByTarget(targetId)
  }
}
