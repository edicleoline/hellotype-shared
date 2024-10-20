export interface NetworkConnection {
  isConnected(): Promise<boolean>
}
