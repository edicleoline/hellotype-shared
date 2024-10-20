import { injectable } from 'inversify'
import { PhoneLocalDataSource } from './phone-data-source'
import { PhoneEntity } from '../entities'
import Result from '../../../domain/result'
import DatabaseService from '../../../react/database/service'

@injectable()
export class LocalPhoneDataSource implements PhoneLocalDataSource {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
    this.initialize()
  }

  private initialize(): void {
    this.dbService.execSync(
      `CREATE TABLE IF NOT EXISTS phones (
        id TEXT PRIMARY KEY,
        phoneNumber TEXT UNIQUE NOT NULL
      );`
    )
  }

  public async save(phone: PhoneEntity): Promise<Result<PhoneEntity>> {
    try {
      await this.dbService.executeTransaction(async () => {
        await this.dbService.execAsync(
          `INSERT OR REPLACE INTO phones (id, phoneNumber) VALUES ($id, $phoneNumber)`,
          { $id: phone.id, $phoneNumber: phone.phoneNumber }
        )
      })
      console.log('find!', await this.find(phone.phoneNumber))
      return Result.success(phone)
    } catch (error) {
      console.log(error)
      return Result.error({ data: { code: 0, detail: String(error) } })
    }
  }

  public async find(param: string): Promise<Result<PhoneEntity | undefined>> {
    const isPhoneNumber = this.isPhoneNumber(param)
    const query = isPhoneNumber
      ? 'SELECT * FROM phones WHERE phoneNumber = $phoneNumber'
      : 'SELECT * FROM phones WHERE id = $id'
    const params = isPhoneNumber
      ? { $phoneNumber: param }
      : { $id: param }

    return await this.dbService.getFirstAsync<PhoneEntity>(query, params)
  }

  private isPhoneNumber(param: string): boolean {
    if (param.startsWith('+')) {
      param = param.slice(1)
    }
    return /^\d+$/.test(param)
  }
}
