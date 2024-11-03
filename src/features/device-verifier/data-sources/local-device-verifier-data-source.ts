import { injectable } from 'inversify'
import { DeviceVerifierStartEntity } from '../entities'
import Result from '../../../domain/result'
import DatabaseService from '../../../react/database/service'
import { DeviceVerifierLocalDataSource } from './device-verifier-data-source'

@injectable()
export class LocalDeviceVerifierDataSource implements DeviceVerifierLocalDataSource {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
    this.initialize()
  }

  private initialize(): void {
    // this.dbService.execSync(`DROP TABLE IF EXISTS phone_verification`)
    this.dbService.execSync(
      `CREATE TABLE IF NOT EXISTS device_verification (
        id INTEGER PRIMARY KEY,
        verificationType TEXT NOT NULL,
        method TEXT NOT NULL,
        targetId TEXT NOT NULL,
        token TEXT NOT NULL,
        otpCodeLen INTEGER NOT NULL,
        params TEXT
      );`
    )
  }

  public async saveStart(entity: DeviceVerifierStartEntity): Promise<Result<DeviceVerifierStartEntity>> {
    try {
      const paramsJson = entity.params ? JSON.stringify(entity.params) : null

      await this.dbService.executeTransaction(async () => {
        await this.dbService.execAsync(
          `INSERT OR REPLACE INTO device_verification
            (verificationType, method, targetId, token, otpCodeLen, params)
            VALUES ($verificationType, $method, $targetId, $token, $otpCodeLen, $params)`,
          {
            $verificationType: entity.verificationType,
            $method: entity.method,
            $targetId: entity.targetId,
            $token: entity.token,
            $otpCodeLen: entity.otpCodeLen,
            $params: paramsJson
          }
        )
      })
      return Result.success(entity)
    } catch (error) {
      console.log(error)
      return Result.error({ data: { code: 0, detail: String(error) } })
    }
  }

  public async findByTarget(targetId: string): Promise<Result<DeviceVerifierStartEntity | undefined>> {
    const result = await this.dbService.getFirstAsync<DeviceVerifierStartEntity>(
      `SELECT * FROM device_verification
        WHERE targetId = $targetId
        ORDER BY id DESC`,
      { $targetId: targetId }
    )

    if (result && result.data) {
      result.data.params = result?.data?.params ? JSON.parse(String(result?.data?.params)) : undefined
    }

    return result
  }
}
