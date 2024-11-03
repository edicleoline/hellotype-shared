import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { DeviceVerifierDataSource } from '../data-sources/device-verifier-data-source'
import TYPES from '../../../types'
import { IdentityEntity } from '../../identity/entities'

@injectable()
export default class VerifyUseCase extends UseCase<Parameters, Result<IdentityEntity | null>> {
  constructor(
    @inject(TYPES.RemoteDeviceVerifierDataSource) private remotePhoneVerifierDataSource: DeviceVerifierDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<IdentityEntity | null>>)
      => Promise<Result<IdentityEntity | null>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: Parameters): Promise<Result<IdentityEntity | null>> {
    return await this.remotePhoneVerifierDataSource.verify(
      parameters.token,
      parameters.otpCode
    )
  }
}

interface Parameters {
  token: string,
  otpCode: string
}
