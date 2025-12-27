import HeroTitle from './HeroTitle'

// interface HeroProps {
//   onSearch?: (query: string) => void
// }

export function Hero() {
  return (
    <div className="relative py-20 h-[70%] px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden p-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center space-y-8 mb-0">
        {/* Title */}
        <div className="space-y-4 animate-fade-in mt-[20vh]">
          {/* <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Sui Greetings
          </h1> */}
          <div className='flex items-center justify-center'>
            <HeroTitle
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
            >
              Sui Greetings
            </HeroTitle>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Create, share, discover greetings and chatting on the Sui blockchain
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-to-r from-black-600 to-gray-600 text-white font-semibold rounded-xl hover:from-black-700 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-b-500/50">
            Create Greeting
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            Explore
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              0
            </div>
            <div className="text-gray-400 mt-2">Total Greetings</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              0
            </div>
            <div className="text-gray-400 mt-2">Active Users</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-pink-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              0
            </div>
            <div className="text-gray-400 mt-2">Today</div>
          </div>
        </div>
      </div>
    </div>
  )
}
