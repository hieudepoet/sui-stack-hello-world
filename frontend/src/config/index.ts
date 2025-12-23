export const config = {
  sui: {
    network: import.meta.env.VITE_SUI_NETWORK,
    packageId: import.meta.env.VITE_PACKAGE_ID,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME,
  },
} as const

export type SuiNetwork = 'mainnet' | 'testnet' | 'devnet' | 'localnet'