import { Link } from 'react-router-dom'

function AboutUs() {
  return (
    <div id="about" className="min-h-screen bg-white dark:bg-slate-950 px-10 py-16 flex flex-col items-center transition-colors duration-500">

      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-5xl font-bold text-rose-500 dark:text-rose-400 mb-6 tracking-tight">
          About Aizenbnb
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed">
          We're building a seamless and enjoyable stay experience for everyone.
          Whether you're a traveler or a host, Aizenbnb is your home away from home.
        </p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
        
        {/* Mission Card */}
        <div className="border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center bg-white dark:bg-slate-900/50 transition-all hover:scale-[1.02]">
          <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            </svg>
          </div>
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
            To connect people with unique spaces and create unforgettable experiences around the world.
          </p>
        </div>

        {/* Team Card */}
        <div className="border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center bg-white dark:bg-slate-900/50 transition-all hover:scale-[1.02]">
          <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-3">Our Team</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
            A passionate group of developers and designers dedicated to making travel simple and fun.
          </p>
        </div>

        {/* Vision Card */}
        <div className="border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center bg-white dark:bg-slate-900/50 transition-all hover:scale-[1.02]">
          <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 21C12 21 4 13.5 4 8.5A8 8 0 0112 1a8 8 0 018 7.5c0 5-8 12.5-8 12.5z" />
            </svg>
          </div>
          <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-3">Our Vision</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
            A world where anyone can find a perfect place to stay, anywhere, anytime.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-16">
        <div className="bg-rose-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl p-8 text-center transition-all">
          <p className="text-5xl font-bold text-rose-500 mb-2">10K+</p>
          <p className="text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-widest">Happy Guests</p>
        </div>
        <div className="bg-rose-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl p-8 text-center transition-all">
          <p className="text-5xl font-bold text-rose-500 mb-2">500+</p>
          <p className="text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-widest">Properties Listed</p>
        </div>
        <div className="bg-rose-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl p-8 text-center transition-all">
          <p className="text-5xl font-bold text-rose-500 mb-2">50+</p>
          <p className="text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-widest">Cities Covered</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 dark:bg-slate-900/40 p-12 rounded-4xl w-full max-w-5xl border border-gray-100 dark:border-slate-800">
        <p className="text-gray-500 dark:text-slate-400 text-lg mb-6">Ready to find your perfect stay?</p>
        <Link 
          to="/all-staycations"
          className="inline-block px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-500/25 active:scale-95 transition-all text-center"
        >
          Get Started Now →
        </Link>
      </div>

    </div>
  )
}

export default AboutUs