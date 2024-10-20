import Result from './../../../domain/result'
import { ClientEntity, DeviceEntity } from '../entities'


export interface ClientDataSource {
  install(device: DeviceEntity): Promise<Result<ClientEntity>>
}
