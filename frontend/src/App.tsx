import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { GreetingsPage } from './pages/GreetingsPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'greetings'>('home')

  const handleNavigate = (page: 'home' | 'greetings') => {
    setCurrentPage(page)
  }

  if (currentPage === 'greetings') {
    return <GreetingsPage onNavigate={handleNavigate} currentPage={currentPage} />
  }

  return <HomePage onNavigate={handleNavigate} currentPage={currentPage} />
}

export default App
