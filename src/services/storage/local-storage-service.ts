export interface LocalStorageService {
  storeData<T>(key: string, value: T): Promise<void>

  getData<T>(key: string): Promise<T | null>

  removeData(key: string): Promise<void>
}
