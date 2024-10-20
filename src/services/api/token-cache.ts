import { injectable } from 'inversify'

export interface AfterChangeAccessTokenEvent {
  eventType: 'afterChangeAccessToken'
  accessToken?: string | null | undefined
}

export interface AfterChangeRefreshTokenEvent {
  eventType: 'afterChangeRefreshToken'
  refreshToken?: string | null | undefined
}

export interface AfterErrorEvent {
  eventType: 'error'
  errorMessage: string
}

export type EventPayload =
  AfterChangeAccessTokenEvent
  | AfterChangeRefreshTokenEvent
  | AfterErrorEvent

export interface TokenCache {
  init(accessToken?: string | null, refreshToken?: string | null): void;

  addObserver(observer: (event: EventPayload) => void): void;

  removeObserver(observer: (event: EventPayload) => void): void;

  reportError(errorMessage: string): void;

  getAccessToken(): string | null | undefined;

  setAccessToken(accessToken?: string | null | undefined): void;

  getRefreshToken(): string | null | undefined;

  setRefreshToken(refreshToken?: string | null | undefined): void;

  isAccessTokenValid(): Promise<boolean>;

  isRefreshTokenValid(): Promise<boolean>;

  clear(): void;
}

@injectable()
export class TokenCacheImpl implements TokenCache {
  private accessToken: string | null | undefined = undefined
  private refreshToken: string | null | undefined = undefined
  private observers: ((event: EventPayload) => void)[] = []

  public init(accessToken?: string | null, refreshToken?: string | null): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  public addObserver(observer: (event: EventPayload) => void) {
    this.observers.push(observer)
  }

  public removeObserver(observer: (event: EventPayload) => void) {
    this.observers = this.observers.filter(o => o !== observer)
  }

  private notifyObservers(event: EventPayload) {
    this.observers.forEach(observer => {
      try {
        observer(event)
      } catch (err) {
        console.error('Observer failed:', err)
      }
    })
  }

  public reportError(errorMessage: string) {
    this.notifyObservers({ eventType: 'error', errorMessage })
  }

  public getAccessToken(): string | null | undefined {
    return this.accessToken
  }

  public setAccessToken(accessToken?: string | null | undefined) {
    this.accessToken = accessToken
    this.notifyObservers({ eventType: 'afterChangeAccessToken', accessToken })
  }

  public getRefreshToken(): string | null | undefined {
    return this.refreshToken
  }

  public setRefreshToken(refreshToken?: string | null | undefined) {
    this.refreshToken = refreshToken
    this.notifyObservers({ eventType: 'afterChangeRefreshToken', refreshToken })
  }

  public async isAccessTokenValid(): Promise<boolean> {
    return !!this.accessToken
  }

  public async isRefreshTokenValid(): Promise<boolean> {
    return !!this.refreshToken
  }

  public clear() {
    this.setAccessToken(null)
    this.setRefreshToken(null)
  }
}

