import { Navbar } from '../components'
import { Hero } from '../components'
import { FeatureCard } from '../components'
import { FloatingLines } from '../components'
import { Footer } from '../components'

interface HomePageProps {
  onNavigate?: (page: 'home' | 'greetings') => void
  currentPage?: 'home' | 'greetings'
}

export function HomePage({ onNavigate, currentPage }: HomePageProps) {
  const handleCreateClick = () => {
    if (onNavigate) {
      onNavigate('greetings')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-black/60 to-black/90">
    
      {/* Navbar */}
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />

      <section className='relative overflow-hidden'>
        {/* Background */}
        <div className='z-0 inset-0 absolute'>
            <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[5, 5, 5]}
            lineDistance={[5, 5, 5]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <div className="relative z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />

          <section className="relative py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Why Choose Sui Greetings?
                </h2>
                <p className="text-lg md:text-xl text-gray-400">
                  Experience the future of decentralized messaging
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon="⚡"
                  title="Lightning Fast"
                  description="Built on Sui blockchain for instant transactions and real-time updates"
                  gradient="from-purple-500 to-blue-500"
                />
                <FeatureCard
                  icon="🔒"
                  title="Secure & Immutable"
                  description="Your greetings are permanently stored on-chain and cannot be altered"
                  gradient="from-purple-500 to-cyan-500"
                />
                <FeatureCard
                  icon="🌐"
                  title="Truly Decentralized"
                  description="No central authority. Your data, your control, forever"
                  gradient="from-blue-500 to-cyan-500"
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Recent Greetings Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Recent Greetings
            </h2>
            <p className="text-xl text-gray-400">
              See what the community is sharing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                onClick={handleCreateClick}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-white text-lg mb-4">
                  Hello from the Sui blockchain! 🚀
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="font-mono">0x1234...5678</span>
                  <button className="text-purple-400 hover:text-purple-300">
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={handleCreateClick}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300"
            >
              View All Greetings
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect your wallet and start creating greetings on the Sui blockchain today
            </p>
            <button 
              onClick={handleCreateClick}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50"
            >
              Connect Wallet & Start
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
