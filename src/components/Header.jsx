import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const goToSection = (id) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate({ pathname: '/', hash: `#${id}` })
  }

  return (
    /* FIXED: Changed from a hardcoded dark color to bg-white for light mode */
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white transition-all dark:border-slate-800 dark:bg-[#111827]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div
          onClick={() => { setMenuOpen(false); navigate('/'); }}
          className="flex cursor-pointer items-center gap-2 text-2xl font-bold text-rose-500 transition-opacity hover:opacity-80"
        >
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="currentColor">

            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
          <span className="hidden lg:inline tracking-tighter">airbnb</span>
        </div>

        {/* Center Nav - Background matches theme wrapper */}
        <nav className="hidden items-center gap-1 md:flex bg-gray-50 dark:bg-slate-800/50 rounded-full p-1 border border-gray-100 dark:border-slate-700">
          {['home', 'about', 'airbnb'].map((link) => (
            <button
              key={link}
              onClick={() => goToSection(link)}
              /* FIXED: text color is gray-600 in light, white in dark */
              className="px-6 py-2 text-sm font-semibold text-gray-600 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full capitalize"
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41" /></svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>

          <button
            onClick={() => navigate('/host')}
            className="rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-rose-600 shadow-md active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header