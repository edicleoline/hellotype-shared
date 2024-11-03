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
  RemoteDeviceVerifierDataSource
} from './features/device-verifier/data-sources/remote-device-verifier-data-source'
import PhoneVerifierStartUseCase from './features/device-verifier/use-cases/start-use-case'
import PhoneVerifyUseCase from './features/device-verifier/use-cases/verify-use-case'
import { RemoteClientDataSource } from './features/device/data-sources/remote-client-data-source'
import InstallUseCase from './features/device/use-cases/install-use-case'
import MethodsByDeviceUseCase from './features/device-verifier/use-cases/methods-by-device.use-case'
import { RemotePhoneDataSource } from './features/phone/data-sources/remote-phone-data-source'
import FindOrCreateUseCase from './features/phone/use-cases/find-or-create-use-case'
import { LocalStorageService } from './services/storage/local-storage-service'
import TYPES from './types'
import { ReactAsyncStorageService } from './infra/services/storage/react-async-storage-service'
import {
  PhoneDataSource,
  PhoneLocalDataSource
} from './features/phone/data-sources/phone-data-source'
import { ClientDataSource } from './features/device/data-sources/client-data-source'
import {
  DeviceVerifierDataSource
} from './features/device-verifier/data-sources/device-verifier-data-source'
import { LocalPhoneDataSource } from './features/phone/data-sources/local-phone-data-source'
import {
  LocalDeviceVerifierDataSource
} from './features/device-verifier/data-sources/local-device-verifier-data-source'
import FindStartByTargetUseCase
  from './features/device-verifier/use-cases/find-start-by-target-use-case'

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

container.bind<DeviceVerifierDataSource>(TYPES.RemoteDeviceVerifierDataSource).to(RemoteDeviceVerifierDataSource)
container.bind<LocalDeviceVerifierDataSource>(TYPES.LocalDeviceVerifierDataSource).to(LocalDeviceVerifierDataSource)

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
container.bind<FindStartByTargetUseCase>(FindStartByTargetUseCase).to(FindStartByTargetUseCase)


export default container
