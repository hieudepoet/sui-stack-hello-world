import { useState } from 'react'

interface GreetingFormProps {
  onLocalCreate: (text: string) => void
  onChainCreate: (text: string) => void
  isConnected: boolean
  isLoading: boolean
}

export function GreetingForm({ onLocalCreate, onChainCreate, isConnected, isLoading }: GreetingFormProps) {
  const [text, setText] = useState('')

  const handleLocalCreate = () => {
    if (!text.trim()) return
    onLocalCreate(text)
    setText('')
  }

  const handleChainCreate = () => {
    if (!text.trim()) return
    onChainCreate(text)
    setText('')
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">Create New Greeting</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a greeting message"
          className="input"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && isConnected && text.trim()) {
              handleChainCreate()
            }
          }}
        />
        <div className="flex gap-3">
          <button 
            onClick={handleLocalCreate}
            className="btn-secondary"
            disabled={!text.trim()}
          >
            Create (Local)
          </button>
          {isConnected && (
            <button 
              onClick={handleChainCreate}
              disabled={isLoading || !text.trim()}
              className="btn-primary flex items-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Create On-Chain
            </button>
          )}
        </div>
      </div>
    </div>
  )
}