interface FeatureCardProps {
  icon: string
  title: string
  description: string
  gradient: string
}

export function FeatureCard({ title, description, gradient }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300`}></div>
      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
        {/* <div className="text-5xl mb-4">{icon}</div> */}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
