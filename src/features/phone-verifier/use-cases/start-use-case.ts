import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import {
  PhoneVerifierDataSource,
  PhoneVerifierLocalDataSource
} from '../data-sources/phone-verifier-data-source'
import { PhoneVerifierStartEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class StartUseCase extends UseCase<StartParameters, Result<PhoneVerifierStartEntity>> {
  constructor(
    @inject(TYPES.RemotePhoneVerifierDataSource) private remotePhoneVerifierDataSource: PhoneVerifierDataSource,
    @inject(TYPES.LocalPhoneVerifierDataSource) private localPhoneVerifierDataSource: PhoneVerifierLocalDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<PhoneVerifierStartEntity>>) => Promise<Result<PhoneVerifierStartEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: StartParameters): Promise<Result<PhoneVerifierStartEntity>> {
    const result = await this.remotePhoneVerifierDataSource.start(
      parameters.phoneId,
      parameters.deviceId,
      parameters.method
    )

    if (result.isSuccess() && result?.data) {
      this.localPhoneVerifierDataSource.saveStart(result.data).then()
    }

    return result
  }
}

interface StartParameters {
  phoneId: string
  deviceId: string
  method: string
}
