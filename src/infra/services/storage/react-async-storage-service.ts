// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import { injectable } from 'inversify'
import { LocalStorageService } from '../../../services/storage/local-storage-service'

@injectable()
export class ReactAsyncStorageService implements LocalStorageService {
  async storeData<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.error('Failed to save data', e)
    }
  }

  async getData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      if (jsonValue !== null) {
        return JSON.parse(jsonValue) as T
      }
      return null
    } catch (e) {
      console.error('Failed to fetch data', e)
      return null
    }
  }

  async removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.error('Failed to remove data', e)
    }
  }
}
