import { inject, injectable } from 'inversify'
import UseCase from '../../../domain/use-case'
import Result from '../../../domain/result'
import { PhoneDataSource, PhoneLocalDataSource } from '../data-sources/phone-data-source'
import { PhoneEntity } from '../entities'
import TYPES from '../../../types'

@injectable()
export default class FindOrCreateUseCase extends UseCase<string, Result<PhoneEntity>> {
  constructor(
    @inject(TYPES.RemotePhoneDataSource) private remotePhoneDataSource: PhoneDataSource,
    @inject(TYPES.LocalPhoneDataSource) private localPhoneDataSource: PhoneLocalDataSource,
    @inject(TYPES.IoDispatcher) ioDispatcher: (fn: () => Promise<Result<PhoneEntity>>) => Promise<Result<PhoneEntity>>
  ) {
    super(ioDispatcher)
  }

  protected async execute(phoneNumber: string): Promise<Result<PhoneEntity>> {
    const result = await this.remotePhoneDataSource.findOrCreate(phoneNumber)

    if (result?.isSuccess() && result?.data) {
      this.localPhoneDataSource.save(result?.data!).then()
    }

    return result
  }
}
