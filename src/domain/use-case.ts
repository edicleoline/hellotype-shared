import { injectable } from 'inversify'
import Result from './result'

// @ts-ignore
@injectable()
export default abstract class UseCase<P, R extends Result<any>> {
  protected constructor(
    private readonly promiseHandler: (callback: () => Promise<R>) => Promise<R>,
    private readonly ioDispatcher?: (callback: () => Promise<R>) => Promise<R>
  ) {
  }

  async invoke(parameters?: P): Promise<R> {
    try {
      return await this.promiseHandler(async () => {
        if (this.ioDispatcher) {
          return this.ioDispatcher(() => this.execute(parameters))
        }
        return this.execute(parameters)
      })
    } catch (e) {
      // @ts-ignore
      return Result.error(e as Error) as R
    }
  }

  protected abstract execute(parameters?: P): Promise<R>
}
