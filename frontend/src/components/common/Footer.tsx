export function Footer() {
  return (
    <>
    {/* Footer */}
    <footer className="py-12 px-4 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <h3 className="text-white font-bold text-lg mb-4">Sui Greetings</h3>
                <p className="text-gray-400 text-sm">
                Decentralized messaging on the Sui blockchain
                </p>
            </div>
            {/* <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                </ul>
            </div> */}
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>© 2025 Sui Greetings. Built with ❤️ on Sui Blockchain</p>
        </div>
    </div>
    </footer>
    </>
  )
}