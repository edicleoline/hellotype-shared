import { injectable } from 'inversify'
import { PhoneVerifierStartEntity } from '../entities'
import Result from '../../../domain/result'
import DatabaseService from '../../../react/database/service'
import { PhoneVerifierLocalDataSource } from './phone-verifier-data-source'

@injectable()
export class LocalPhoneVerifierDataSource implements PhoneVerifierLocalDataSource {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
    this.initialize()
  }

  private initialize(): void {
    this.dbService.execSync(
      `CREATE TABLE IF NOT EXISTS phone_verification (
        id INTEGER PRIMARY KEY,
        phoneId TEXT KEY,
        method TEXT NOT NULL,
        token TEXT NOT NULL,
        otpCodeLen INTEGER NOT NULL
      );`
    )
  }

  public async saveStart(entity: PhoneVerifierStartEntity): Promise<Result<PhoneVerifierStartEntity>> {
    try {
      await this.dbService.executeTransaction(async () => {
        await this.dbService.execAsync(
          `INSERT OR REPLACE INTO phone_verification
            (phoneId, method, token, otpCodeLen)
            VALUES ($phoneId, $method, $token, $otpCodeLen)`,
          {
            $phoneId: entity.phoneId,
            $method: entity.method,
            $token: entity.token,
            $otpCodeLen: entity.otpCodeLen
          }
        )
      })
      return Result.success(entity)
    } catch (error) {
      console.log(error)
      return Result.error({ data: { code: 0, detail: String(error) } })
    }
  }

  public async findByPhone(phoneId: string): Promise<Result<PhoneVerifierStartEntity | undefined>> {
    return await this.dbService.getFirstAsync<PhoneVerifierStartEntity>(
      `SELECT * FROM phone_verification
        WHERE phoneId = $phoneId
        ORDER BY id DESC`,
      { $phoneId: phoneId }
    )
  }
}
