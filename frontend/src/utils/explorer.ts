import { config } from '../config'

/**
 * Get the explorer URL for a given object ID
 */
export function getExplorerUrl(objectId: string): string {
  const network = config.sui.network || 'testnet'
  
  const baseUrls: Record<string, string> = {
    mainnet: 'https://suiscan.xyz/mainnet',
    testnet: 'https://suiscan.xyz/testnet',
    devnet: 'https://suiscan.xyz/devnet',
    localnet: 'http://localhost:3000' // Local explorer if available
  }

  const baseUrl = baseUrls[network] || baseUrls.testnet
  return `${baseUrl}/object/${objectId}`
}

/**
 * Get the explorer URL for a transaction
 */
export function getTransactionExplorerUrl(txDigest: string): string {
  const network = config.sui.network || 'testnet'
  
  const baseUrls: Record<string, string> = {
    mainnet: 'https://suiscan.xyz/mainnet',
    testnet: 'https://suiscan.xyz/testnet',
    devnet: 'https://suiscan.xyz/devnet',
    localnet: 'http://localhost:3000'
  }

  const baseUrl = baseUrls[network] || baseUrls.testnet
  return `${baseUrl}/tx/${txDigest}`
}

/**
 * Get the explorer URL for an address
 */
export function getAddressExplorerUrl(address: string): string {
  const network = config.sui.network || 'testnet'
  
  const baseUrls: Record<string, string> = {
    mainnet: 'https://suiscan.xyz/mainnet',
    testnet: 'https://suiscan.xyz/testnet',
    devnet: 'https://suiscan.xyz/devnet',
    localnet: 'http://localhost:3000'
  }

  const baseUrl = baseUrls[network] || baseUrls.testnet
  return `${baseUrl}/account/${address}`
}
