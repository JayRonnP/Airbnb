function Header() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => scrollTo('home')}
          className="text-xl font-bold text-rose-500 cursor-pointer"
        >
          Airbnb
        </h1>

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          <button onClick={() => scrollTo('home')} className="text-sm text-gray-600 hover:text-gray-900">
            Home
          </button>
          <button onClick={() => scrollTo('about')} className="text-sm text-gray-600 hover:text-gray-900">
            About
          </button>
          <button onClick={() => scrollTo('airbnb')} className="text-sm text-gray-600 hover:text-gray-900">
            Airbnb
          </button>
        </nav>

        {/* Button */}
        <button className="bg-rose-500 text-white text-sm px-5 py-2 rounded-lg hover:bg-rose-600 transition">
          Sign Up
        </button>

      </div>
    </header>
  )
}

export default Header