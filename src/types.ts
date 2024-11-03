const TYPES = {
  LocalStorageService: Symbol.for('LocalStorageService'),
  RestApiClient: Symbol.for('RestApiClient'),
  IoDispatcher: Symbol.for('IoDispatcher'),
  RemoteAuthDataSource: Symbol.for('RemoteAuthDataSource'),
  TokenCache: Symbol.for('TokenCache'),
  RemoteAccountDataSource: Symbol.for('RemoteAccountDataSource'),
  RemoteDeviceVerifierDataSource: Symbol.for('RemoteDeviceVerifierDataSource'),
  LocalDeviceVerifierDataSource: Symbol.for('LocalDeviceVerifierDataSource'),
  RemoteClientDataSource: Symbol.for('RemoteClientDataSource'),
  RemotePhoneDataSource: Symbol.for('RemotePhoneDataSource'),
  LocalPhoneDataSource: Symbol.for('LocalPhoneDataSource')
}

export default TYPES
