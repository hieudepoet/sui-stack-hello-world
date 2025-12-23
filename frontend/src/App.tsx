import { useGreetings } from './hooks/useGreetings'
import { Header, GreetingForm, GreetingList, WalletStatus, OnChainGreetingList } from './components'

function App() {
  const {
    greetings,
    onChainGreetings,
    isLoading,
    error,
    account,
    addLocalGreeting,
    createOnChainGreeting,
    updateOnChainGreeting,
    refreshGreetings
  } = useGreetings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <Header />
        
        <GreetingForm
          onLocalCreate={addLocalGreeting}
          onChainCreate={createOnChainGreeting}
          isConnected={!!account}
          isLoading={isLoading}
        />
        
        <OnChainGreetingList 
          greetings={onChainGreetings}
          onUpdate={updateOnChainGreeting}
          onRefresh={refreshGreetings}
          isLoading={isLoading}
          isConnected={!!account}
        />
        
        <GreetingList greetings={greetings} />
        
        <WalletStatus account={account} error={error} />
      </div>
    </div>
  )
}

export default App
