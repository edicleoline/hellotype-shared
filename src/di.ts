import 'reflect-metadata'
import { Container } from 'inversify'

import { AuthDataSource } from './features/auth/data-sources/auth-data-source'
import { RemoteAuthDataSource } from './features/auth/data-sources/remote-auth-data-source'
import IdentifyUseCase from './features/auth/use-cases/identify-use-case'
import { RestApiClient } from './services/api/rest/rest-api-client'
import { AxiosRestApiClient } from './infra/services/api/rest/axios-rest-api-client'
import AuthenticateUseCase from './features/auth/use-cases/authenticate-use-case'
import { AccountDataSource } from './features/account/data-sources/account-data-source'
import { RemoteAccountDataSource } from './features/account/data-sources/remote-account-data-source'
import MeUseCase from './features/account/use-cases/me-use-case'

const ioDispatcherFunction = async (fn: () => Promise<string>): Promise<string> => {
  return await fn()
}

const container = new Container()

container.bind<(fn: () => Promise<string>) => Promise<string>>('IoDispatcher').toConstantValue(ioDispatcherFunction)

container.bind<RestApiClient>('RestApiClient').to(AxiosRestApiClient)

container.bind<AuthDataSource>('RemoteAuthDataSource').to(RemoteAuthDataSource)
container.bind<AccountDataSource>('RemoteAccountDataSource').to(RemoteAccountDataSource)

container.bind<IdentifyUseCase>(IdentifyUseCase).to(IdentifyUseCase)
container.bind<AuthenticateUseCase>(AuthenticateUseCase).to(AuthenticateUseCase)
container.bind<MeUseCase>(MeUseCase).to(MeUseCase)

export default container
