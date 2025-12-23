import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { SuiClient } from '@mysten/sui/client'
import { getFullnodeUrl } from '@mysten/sui/client'
import { config, type SuiNetwork } from '../config'

interface SuiProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export function SuiProvider({ children }: SuiProviderProps) {
  const network = config.sui.network as SuiNetwork
  const suiClient = new SuiClient({ url: getFullnodeUrl(network) })

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={{ [network]: suiClient }} defaultNetwork={network}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}