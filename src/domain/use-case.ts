import { injectable } from 'inversify'
import Result from './result'

// @ts-ignore
@injectable()
export default abstract class UseCase<P, R> {
  protected constructor(
    private readonly promiseHandler: (callback: () => Promise<R>) => Promise<R>,
    private readonly ioDispatcher?: (callback: () => Promise<R>) => Promise<R>
  ) {
  }

  async invoke(parameters?: P): Promise<Result<R>> {
    try {
      const result = await this.promiseHandler(async () => {
        if (this.ioDispatcher) {
          return this.ioDispatcher(() => this.execute(parameters))
        }
        return this.execute(parameters)
      })
      return Result.success(result)
    } catch (e) {
      return Result.error(e as Error)
    }
  }

  protected abstract execute(parameters?: P): Promise<R>
}
