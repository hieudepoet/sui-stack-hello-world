import { ConnectButton } from '@mysten/dapp-kit'
import { useState } from 'react'

interface NavbarProps {
  onNavigate?: (page: 'home' | 'greetings') => void
  currentPage?: 'home' | 'greetings'
}

export function Navbar({ onNavigate, currentPage = 'home' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (page: 'home' | 'greetings') => {
    if (onNavigate) {
      onNavigate(page)
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer"
          >
            <span className="text-white font-extrabold text-3xl tracking-wide">
              Sui Greetings
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors text-base ${
                currentPage === 'home' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('greetings')}
              className={`transition-colors text-base ${
                currentPage === 'greetings' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              Demo
            </button>
            <a
              href="#resources"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Resources
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              About
            </a>
            <a
              href="#docs"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Docs
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ConnectButton />

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 space-y-4 animate-fade-in">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('greetings')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors"
            >
              Demo
            </button>
            <a
              href="#about"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#docs"
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Docs
            </a>
          </div>
        )}
      </div>
    </nav>

  )
}
