import { useState } from 'react'
import { Navbar } from '../components'
import { useGreetings } from '../hooks/useGreetings'
import { GreetingForm, GreetingList, WalletStatus, OnChainGreetingList } from '../components'
import { getExplorerUrl, getAddressExplorerUrl } from '../utils/explorer'

interface GreetingsPageProps {
  onNavigate?: (page: 'home' | 'greetings') => void
  currentPage?: 'home' | 'greetings'
}

export function GreetingsPage({ onNavigate, currentPage }: GreetingsPageProps) {
  const [activeTab, setActiveTab] = useState<'private' | 'global'>('private')
  
  const {
    greetings,
    onChainGreetings,
    myOnChainGreetings,
    isLoading,
    error,
    account,
    addLocalGreeting,
    createOnChainGreeting,
    updateOnChainGreeting,
    refreshGreetings,
    refreshMyGreetings
  } = useGreetings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />
      
      <div className="max-w-6xl mx-auto px-4 py-8 pt-28 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
            Greetings Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Create, view, and manage greetings on the Sui blockchain
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-1 border border-white/10 inline-flex">
            <button
              onClick={() => setActiveTab('private')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'private'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🔒 Private
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'global'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🌐 Global
            </button>
          </div>
        </div>

        {/* Private Tab Content */}
        {activeTab === 'private' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Your Personal Greetings</h2>
              <p className="text-gray-400">Create and manage your own greetings</p>
            </div>

            <GreetingForm
              onLocalCreate={addLocalGreeting}
              onChainCreate={createOnChainGreeting}
              isConnected={!!account}
              isLoading={isLoading}
            />
            
            <OnChainGreetingList 
              greetings={myOnChainGreetings}
              onUpdate={updateOnChainGreeting}
              onRefresh={refreshMyGreetings}
              isLoading={isLoading}
              isConnected={!!account}
            />
            
            <GreetingList greetings={greetings} />
            
            <WalletStatus account={account} error={error} />
          </div>
        )}

        {/* Global Tab Content */}
        {activeTab === 'global' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">All Greetings on Sui</h2>
              <p className="text-gray-400">Explore greetings created by the community</p>
            </div>

            {/* Global Greetings List */}
            <div className="card bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/30">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold text-blue-900">🌍 Global Greetings</h2>
                  <span className="px-3 py-1 text-sm bg-purple-600 text-white rounded-full font-semibold">
                    {onChainGreetings.length}
                  </span>
                </div>
                <button 
                  onClick={refreshGreetings}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <span className={isLoading ? 'animate-spin' : ''}>
                    {isLoading ? '⏳' : '🔄'}
                  </span>
                  Refresh
                </button>
              </div>
              
              {onChainGreetings.length === 0 ? (
                <div className="p-12 text-center bg-purple-900/10 rounded-lg border border-purple-500/20">
                  <p className="text-lg text-gray-400 mb-2">
                    📝 No greetings found yet.
                  </p>
                  <p className="text-sm text-gray-500">
                    Be the first to create a greeting!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {onChainGreetings.map((greeting) => (
                    <div 
                      key={greeting.objectId} 
                      className="p-4 bg-blue-200 backdrop-blur-lg rounded-lg border border-blue-900 hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 bg-purple-900/30 px-2 py-1 rounded">On-Chain</span>
                      </div>
                      <p className="text-blue-900 text-lg mb-3 font-medium">
                        {greeting.text}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-gray-500 font-mono truncate flex-1">
                            🆔 {greeting.objectId.slice(0, 8)}...{greeting.objectId.slice(-6)}
                          </p>
                          <a
                            href={getExplorerUrl(greeting.objectId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 text-xs bg-cyan-600/20 text-blue-900 rounded hover:bg-cyan-600/30 transition-colors border border-cyan-500/30 flex items-center gap-1 whitespace-nowrap"
                          >
                            <span>🔍</span>
                            <span>View</span>
                          </a>
                        </div>
                        {greeting.owner && (
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-gray-500 font-mono truncate flex-1">
                              👤 {greeting.owner.slice(0, 8)}...{greeting.owner.slice(-6)}
                            </p>
                            <a
                              href={getAddressExplorerUrl(greeting.owner)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded hover:bg-purple-600/30 transition-colors border border-purple-500/30 whitespace-nowrap"
                            >
                              Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">ℹ️</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About Global Greetings</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    This tab displays all greetings created on the Sui blockchain by any user. 
                    All greetings are stored as shared objects, making them publicly visible and immutable. 
                    Click <span className="text-cyan-300 font-semibold">"View"</span> to see the object details on Suiscan Explorer, 
                    or <span className="text-purple-300 font-semibold">"Profile"</span> to view the creator's address. 
                    Connect your wallet to create your own greeting!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
