import { config } from '../config'

interface WalletStatusProps {
  account?: { address: string } | null
  error?: string
}

export function WalletStatus({ account, error }: WalletStatusProps) {
  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Sui Integration</h2>
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">Error: {error}</p>
        </div>
      )}
      {!account ? (
        <p className="text-gray-600">Connect your wallet to create on-chain greetings</p>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span>
            <span className="text-gray-700">
              Wallet connected: <span className="font-mono">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Network: <span className="font-semibold">{config.sui.network}</span>
          </p>
          <p className="text-sm text-gray-600 break-all">
            Package ID: <span className="font-mono text-xs">{config.sui.packageId}</span>
          </p>
        </div>
      )}
    </div>
  )
}