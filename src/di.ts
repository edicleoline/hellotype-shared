import 'reflect-metadata'
import { Container } from 'inversify'

import { AuthDataSource } from './features/auth/data-sources/auth-data-source'
import { RemoteAuthDataSource } from './features/auth/data-sources/remote-auth-data-source'
import { AccountDataSource } from './features/account/data-sources/account-data-source'
import { RemoteAccountDataSource } from './features/account/data-sources/remote-account-data-source'

import IdentifyUseCase from './features/auth/use-cases/identify-use-case'
import AuthenticateUseCase from './features/auth/use-cases/authenticate-use-case'
import WhoisUseCase from './features/account/use-cases/whois-use-case'

import { RestApiClient } from './services/api/rest/rest-api-client'
import { FetchRestApiClient } from './infra/services/api/rest/fetch-rest-api-client'
import { TokenCache, TokenCacheImpl } from './services/api/token-cache'
import {
  RemotePhoneVerifierDataSource
} from './features/phone-verifier/data-sources/remote-phone-verifier-data-source'
import PhoneVerifierStartUseCase from './features/phone-verifier/use-cases/start-use-case'
import PhoneVerifyUseCase from './features/phone-verifier/use-cases/verify-use-case'
import { RemoteClientDataSource } from './features/client/data-sources/remote-client-data-source'
import InstallUseCase from './features/client/use-cases/install-use-case'
import MethodsByDeviceUseCase from './features/phone-verifier/use-cases/methods-by-device.use-case'
import { RemotePhoneDataSource } from './features/phone/data-sources/remote-phone-data-source'
import FindOrCreateUseCase from './features/phone/use-cases/find-or-create-use-case'
import { LocalStorageService } from './services/storage/local-storage-service'
import TYPES from './types'
import { ReactAsyncStorageService } from './infra/services/storage/react-async-storage-service'
import {
  PhoneDataSource,
  PhoneLocalDataSource
} from './features/phone/data-sources/phone-data-source'
import { ClientDataSource } from './features/client/data-sources/client-data-source'
import {
  PhoneVerifierDataSource
} from './features/phone-verifier/data-sources/phone-verifier-data-source'
import { LocalPhoneDataSource } from './features/phone/data-sources/local-phone-data-source'
import {
  LocalPhoneVerifierDataSource
} from './features/phone-verifier/data-sources/local-phone-verifier-data-source'
import FindStartByPhoneUseCase
  from './features/phone-verifier/use-cases/find-start-by-phone-use-case'

const ioDispatcherFunction = async <T>(fn: () => Promise<T>): Promise<T> => {
  return await fn()
}

const container = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true
})

container.bind<(fn: () => Promise<any>) => Promise<any>>(TYPES.IoDispatcher).toConstantValue(ioDispatcherFunction)

container.bind<TokenCache>(TYPES.TokenCache).to(TokenCacheImpl).inSingletonScope()

container.bind<RestApiClient>(TYPES.RestApiClient).to(FetchRestApiClient).inSingletonScope()
container.bind<LocalStorageService>(TYPES.LocalStorageService).to(ReactAsyncStorageService).inSingletonScope()

container.bind<AuthDataSource>(TYPES.RemoteAuthDataSource).to(RemoteAuthDataSource)
container.bind<AccountDataSource>(TYPES.RemoteAccountDataSource).to(RemoteAccountDataSource)

container.bind<PhoneVerifierDataSource>(TYPES.RemotePhoneVerifierDataSource).to(RemotePhoneVerifierDataSource)
container.bind<LocalPhoneVerifierDataSource>(TYPES.LocalPhoneVerifierDataSource).to(LocalPhoneVerifierDataSource)

container.bind<ClientDataSource>(TYPES.RemoteClientDataSource).to(RemoteClientDataSource)

container.bind<PhoneDataSource>(TYPES.RemotePhoneDataSource).to(RemotePhoneDataSource)
container.bind<PhoneLocalDataSource>(TYPES.LocalPhoneDataSource).to(LocalPhoneDataSource)

container.bind<IdentifyUseCase>(IdentifyUseCase).to(IdentifyUseCase)
container.bind<AuthenticateUseCase>(AuthenticateUseCase).to(AuthenticateUseCase)
container.bind<WhoisUseCase>(WhoisUseCase).to(WhoisUseCase)
container.bind<PhoneVerifierStartUseCase>(PhoneVerifierStartUseCase).to(PhoneVerifierStartUseCase)
container.bind<PhoneVerifyUseCase>(PhoneVerifyUseCase).to(PhoneVerifyUseCase)
container.bind<InstallUseCase>(InstallUseCase).to(InstallUseCase)
container.bind<MethodsByDeviceUseCase>(MethodsByDeviceUseCase).to(MethodsByDeviceUseCase)
container.bind<FindOrCreateUseCase>(FindOrCreateUseCase).to(FindOrCreateUseCase)
container.bind<FindStartByPhoneUseCase>(FindStartByPhoneUseCase).to(FindStartByPhoneUseCase)


export default container
