import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { PhoneVerifierLocalDataSource } from '../data-sources/phone-verifier-data-source'
import { PhoneVerifierStartEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class FindStartByPhoneUseCase extends UseCase<string, Result<PhoneVerifierStartEntity | undefined>> {
  constructor(
    @inject(TYPES.LocalPhoneVerifierDataSource) private localPhoneVerifierDataSource: PhoneVerifierLocalDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<PhoneVerifierStartEntity | undefined>>)
      => Promise<Result<PhoneVerifierStartEntity | undefined>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(phoneId: string): Promise<Result<PhoneVerifierStartEntity | undefined>> {
    return await this.localPhoneVerifierDataSource.findByPhone(phoneId)
  }
}
