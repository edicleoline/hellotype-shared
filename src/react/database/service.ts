import * as SQLite from 'expo-sqlite'
import Result from '../../domain/result'

class DatabaseService {
  private static instance: DatabaseService
  private db: SQLite.SQLiteDatabase | null = null

  private constructor() {
    this.db = this.getDBConnection()
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  private getDBConnection(): SQLite.SQLiteDatabase {
    if (!this.db) {
      this.db = SQLite.openDatabaseSync('hello_db_8')
    }
    return this.db
  }

  public async executeTransaction<T>(operation: () => Promise<T>): Promise<T> {
    const db = this.getDBConnection()
    await db.execAsync('BEGIN TRANSACTION')
    try {
      const result = await operation()
      await db.execAsync('COMMIT')
      return result
    } catch (error) {
      await db.execAsync('ROLLBACK')
      throw error
    }
  }

  public execSync(query: string): void {
    const db = this.getDBConnection()
    db.execSync(query)
  }

  public async execAsync(query: string, params: any): Promise<any> {
    const db = this.getDBConnection()
    const statement = await db.prepareAsync(query)
    try {
      return statement.executeAsync(params)
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    } finally {
      await this.finalizeAsync(statement)
    }
  }

  private async finalizeAsync(statement: SQLite.SQLiteStatement): Promise<void> {
    try {
      await statement.finalizeAsync()
    } catch {
    }
  }

  private async executeQuery<T>(query: string, params: any = {}): Promise<Result<T[]>> {
    const db = this.getDBConnection()
    let statement: SQLite.SQLiteStatement | undefined

    try {
      statement = await db.prepareAsync(query)
      const result = await statement.executeAsync(params)
      const allRows = await result.getAllAsync()

      return Result.success(allRows as T[])
    } catch (error) {
      console.error('Error executing query:', error)
      return Result.error({ data: { code: 0, detail: String(error) } })
    } finally {
      if (statement) {
        await this.finalizeAsync(statement)
      }
    }
  }

  public async getFirstAsync<T>(query: string, params: any = {}): Promise<Result<T | undefined>> {
    const result = await this.executeQuery<T>(query, params)

    if (result.isError()) {
      return Result.error(result.error)
    }

    const allRows = result.data

    if (!allRows?.length) {
      return Result.success(undefined)
    }

    return Result.success(allRows.at(0) as T)
  }

  public async getAllAsync<T>(query: string, params: any = {}): Promise<Result<T[]>> {
    return await this.executeQuery<T>(query, params)
  }

  public async getLastAsync<T>(query: string, params: any = {}): Promise<Result<T | undefined>> {
    const result = await this.executeQuery<T>(query, params)

    if (result.isError()) {
      return Result.error(result.error)
    }

    const allRows = result.data

    if (!allRows?.length) {
      return Result.success(undefined)
    }

    return Result.success(allRows.at(-1) as T)
  }

  public async close(): Promise<void> {
    this.db = null
  }
}

export default DatabaseService
