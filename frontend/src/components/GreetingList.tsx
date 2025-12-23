import type { Greeting } from '../types'

interface GreetingListProps {
  greetings: Greeting[]
}

export function GreetingList({ greetings }: GreetingListProps) {
  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-semibold">Local Greetings</h2>
        <span className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
          {greetings.length}
        </span>
      </div>
      {greetings.length === 0 ? (
        <p className="text-gray-500">No local greetings yet. Create one above for testing!</p>
      ) : (
        <div className="space-y-3">
          {greetings.map((greeting) => (
            <div 
              key={greeting.id} 
              className="p-4 bg-gray-100 border border-gray-300 rounded-lg animate-slide-up hover:shadow-md transition-shadow"
            >
              <p className="font-medium text-gray-900">{greeting.text}</p>
              {greeting.timestamp && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(greeting.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}