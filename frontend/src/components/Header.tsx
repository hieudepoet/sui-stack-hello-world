import { ConnectButton } from '@mysten/dapp-kit'
import { config } from '../config'

export function Header() {
  return (
    <div className="flex justify-between items-start">
      <h1 className="text-4xl font-bold text-gray-900">{config.app.name}</h1>
      <ConnectButton />
    </div>
  )
}