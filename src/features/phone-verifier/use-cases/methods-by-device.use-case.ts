import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { PhoneVerifierDataSource } from '../data-sources/phone-verifier-data-source'
import { MethodEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class MethodsByDeviceUseCase extends UseCase<string, Result<MethodEntity[]>> {
  constructor(
    @inject(TYPES.RemotePhoneVerifierDataSource) private remotePhoneVerifierDataSource: PhoneVerifierDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<MethodEntity[]>>) => Promise<Result<MethodEntity[]>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(deviceId: string): Promise<Result<MethodEntity[]>> {
    return await this.remotePhoneVerifierDataSource.methodsByDevice(deviceId)
  }
}

