import { useState } from 'react'
import type { OnChainGreeting } from '../types'

interface OnChainGreetingListProps {
  greetings: OnChainGreeting[]
  onUpdate: (objectId: string, newText: string) => void
  onRefresh: () => void
  isLoading: boolean
  isConnected: boolean
}

export function OnChainGreetingList({ greetings, onUpdate, onRefresh, isLoading, isConnected }: OnChainGreetingListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const handleStartEdit = (greeting: OnChainGreeting) => {
    setEditingId(greeting.objectId)
    setEditText(greeting.text)
  }

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      onUpdate(editingId, editText)
      setEditingId(null)
      setEditText('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const currentGreeting = greetings.find(g => g.objectId === editingId)

  return (
    <>
      <div className="card bg-blue-50 border-blue-200 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-blue-900">⛓️ Shared Greetings (On-Chain)</h2>
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full font-semibold">
              {greetings.length}
            </span>
          </div>
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <span className={isLoading ? 'animate-spin' : ''}>
              {isLoading ? '⏳' : '🔄'}
            </span>
            Refresh
          </button>
        </div>
        
        {greetings.length === 0 ? (
          <div className="p-8 text-center bg-blue-100 rounded-lg">
            <p className="text-lg text-gray-600 mb-2">
              📝 No shared greetings on-chain yet.
            </p>
            <p className="text-sm text-gray-500">
              {isConnected 
                ? 'Create the first greeting above!' 
                : 'Connect your wallet to create greetings!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {greetings.map((greeting) => (
              <div 
                key={greeting.objectId} 
                className="p-4 bg-blue-100 border-2 border-blue-300 rounded-lg hover:shadow-lg transition-all animate-slide-up"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xl font-bold text-blue-900 mb-3">
                      {greeting.text}
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 font-mono">
                        🆔 {greeting.objectId.slice(0, 10)}...{greeting.objectId.slice(-8)}
                      </p>
                      {greeting.owner && (
                        <p className="text-xs text-gray-600 font-mono">
                          👤 {greeting.owner.slice(0, 8)}...{greeting.owner.slice(-6)}
                        </p>
                      )}
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        Shared Object
                      </span>
                    </div>
                  </div>
                  {isConnected && (
                    <button 
                      onClick={() => handleStartEdit(greeting)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      ✏️ Update
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {editingId && currentGreeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={handleCancelEdit}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-2">Update Shared Greeting</h3>
            <p className="text-sm text-gray-600 mb-6">
              Edit the greeting text on the Sui blockchain. This will create a new transaction.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Current Text:</label>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-700">{currentGreeting.text}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">New Text:</label>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Enter new greeting text"
                  className="input"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && editText.trim() && editText !== currentGreeting.text) {
                      handleSaveEdit()
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button 
                onClick={handleCancelEdit}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                disabled={!editText.trim() || isLoading || editText === currentGreeting.text}
                className="btn-primary flex items-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
