import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'

function Sidebar({ onLogout, currentPath }) {
  // Navigation Links
  const navItems = [
    { name: 'Dashboard', path: '/host-portal', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { name: 'Bookings', path: '/host-portal/bookings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { name: 'Properties', path: '/host-portal/properties', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )}
  ]

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 h-screen sticky top-0 flex flex-col pt-6 pb-6 shadow-sm z-20">
      
      {/* Brand */}
      <div className="px-6 mb-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-rose-400 flex items-center justify-center shadow-md shadow-rose-500/20">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill="currentColor" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Host Portal</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          // Exact match for dashboard, startswith for subroutes
          const isActive = item.path === '/host-portal' 
            ? currentPath === '/host-portal' 
            : currentPath.startsWith(item.path)

          return (
            <a 
              key={item.name}
              href={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                isActive 
                  ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </a>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

function HostLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/host')
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-500">
      <Sidebar onLogout={handleLogout} currentPath={location.pathname} />
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Renders the matching child route inside the layout */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HostLayout
