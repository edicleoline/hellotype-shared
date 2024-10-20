import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { PhoneVerifierDataSource } from '../data-sources/phone-verifier-data-source'
import TYPES from '../../../types'

@injectable()
export default class VerifyUseCase extends UseCase<VerifyParameters, Result<void>> {
  constructor(
    @inject(TYPES.RemotePhoneVerifierDataSource) private remotePhoneVerifierDataSource: PhoneVerifierDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<void>>) => Promise<Result<void>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(parameters: VerifyParameters): Promise<Result<void>> {
    return await this.remotePhoneVerifierDataSource.verify(
      parameters.token,
      parameters.otpCode
    )
  }
}

interface VerifyParameters {
  token: string,
  otpCode: string
}
