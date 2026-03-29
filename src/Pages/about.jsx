function AboutUs() {
  return (
    <div id="about" className="min-h-screen bg-white px-10 py-16 flex flex-col items-center">

      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-5xl font-medium text-rose-500 mb-4">About Aizenbnb</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          We're building a seamless and enjoyable stay experience for everyone.
          Whether you're a traveler or a host, Aizenbnb is your home away from home.
        </p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl w-full mb-16">
        <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            </svg>
          </div>
          <h3 className="text-gray-900 font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To connect people with unique spaces and create unforgettable experiences around the world.
          </p>
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h3 className="text-gray-900 font-semibold mb-2">Our Team</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A passionate group of developers and designers dedicated to making travel simple and fun.
          </p>
        </div>

        <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 21C12 21 4 13.5 4 8.5A8 8 0 0112 1a8 8 0 018 7.5c0 5-8 12.5-8 12.5z" />
            </svg>
          </div>
          <h3 className="text-gray-900 font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A world where anyone can find a perfect place to stay, anywhere, anytime.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl w-full mb-16">
        <div className="bg-rose-50 rounded-2xl p-6 text-center">
          <p className="text-4xl font-semibold text-rose-500 mb-1">10K+</p>
          <p className="text-sm text-gray-400">Happy Guests</p>
        </div>
        <div className="bg-rose-50 rounded-2xl p-6 text-center">
          <p className="text-4xl font-semibold text-rose-500 mb-1">500+</p>
          <p className="text-sm text-gray-400">Properties Listed</p>
        </div>
        <div className="bg-rose-50 rounded-2xl p-6 text-center">
          <p className="text-4xl font-semibold text-rose-500 mb-1">50+</p>
          <p className="text-sm text-gray-400">Cities Covered</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-4">Ready to find your perfect stay?</p>
        <button className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-colors">
          Get Started →
        </button>
      </div>

    </div>
  )
}

export default AboutUs