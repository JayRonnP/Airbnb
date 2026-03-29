function Footer() {
  return (
    <footer id="contacts" className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-3">Aizenbnb</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              this website is made to serve people to have them a nice and cozy stay
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-3"></h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Support</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex items-center justify-between">

          {/* Copyright */}
          <p className="text-xs text-gray-500">© 2026 MyApp. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {/* Twitter */}
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer