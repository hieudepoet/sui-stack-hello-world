export interface Greeting {
  id: string
  text: string
  timestamp?: number
  isOnChain?: boolean
  objectId?: string
}

export interface OnChainGreeting {
  objectId: string
  text: string
  owner?: string
}

export interface AppState {
  greetings: Greeting[]
  isLoading: boolean
  error?: string
}