import container from './di'
import IdentifyUseCase from './features/auth/use-cases/identify-use-case'
import AuthenticateUseCase from './features/auth/use-cases/authenticate-use-case'
import MeUseCase from './features/account/use-cases/me-use-case'
import { config } from './services/api/rest/api-config'

config.baseUrl = 'http://127.0.0.1:8000/api/v1'

const identifyUseCase = container.get<IdentifyUseCase>(IdentifyUseCase)
const authenticateUseCase = container.get<AuthenticateUseCase>(AuthenticateUseCase)
const meUseCase = container.get<MeUseCase>(MeUseCase)

identifyUseCase.invoke('edicleo').then((identifyResult) => {
  if (identifyResult?.data?.accessToken) {
    authenticateUseCase.invoke({
      token: identifyResult.data?.accessToken,
      password: 'xzxz0909'
    }).then((result) => {
      config.token = result?.data?.accessToken || ''
      // console.log(result)
      // console.log(result.error?.response?.status)

      meUseCase.invoke().then(result => console.log(result))
    })
  }
})


export default {}
