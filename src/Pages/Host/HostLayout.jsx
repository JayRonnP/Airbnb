import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'

function Sidebar({ onLogout, currentPath }) {
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
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 h-screen sticky top-0 flex flex-col pt-6 pb-6 shadow-sm z-30">
      <div className="px-6 mb-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-rose-500 to-rose-400 flex items-center justify-center shadow-md shadow-rose-500/20">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill="currentColor" /></svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white uppercase tracking-wider">Aizen</span>
      </div>
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = item.path === '/host-portal' ? currentPath === '/host-portal' : currentPath.startsWith(item.path)
          return (
            <Link key={item.name} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${isActive ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white'}`}>
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="px-4 mt-auto">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default function HostLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [notifications, setNotifications] = useState([])
  const [showNotif, setShowNotif] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Mapping for notification alerts
  const villaNames = {
    '11111111-1111-1111-1111-111111111111': 'Azure Pool Villa',
    '22222222-2222-2222-2222-222222222222': 'Forest Retreat Cabin',
    '33333333-3333-3333-3333-333333333333': 'Beachfront Suite',
    '44444444-4444-4444-4444-444444444444': 'City Loft Studio',
  }

  useEffect(() => {
    // Real-time booking subscription
    const channel = supabase
      .channel('public:bookings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
        const newBooking = payload.new
        const villaName = villaNames[newBooking.villa_id] || 'New Villa'
        
        const notif = {
          id: Date.now(),
          title: 'New Reservation!',
          message: `${newBooking.customer_name} booked ${villaName} for ${newBooking.pax}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'booking'
        }
        
        setNotifications(prev => [notif, ...prev].slice(0, 5))
        setUnreadCount(prev => prev + 1)
        
        // Show a temporary visual indicator if dropdown is closed
        if (!showNotif) {
           // Optionally play a sound or show a toast here
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/host')
  }

  const toggleNotifications = () => {
    setShowNotif(!showNotif)
    if (!showNotif) setUnreadCount(0)
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans selection:bg-rose-500 selection:text-white transition-colors duration-500">
      <Sidebar onLogout={handleLogout} currentPath={location.pathname} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-end sticky top-0 z-20">

          <div className="flex items-center gap-6">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className={`p-3 rounded-2xl transition-all active:scale-95 border ${showNotif ? 'bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20' : 'bg-white dark:bg-slate-800 text-gray-400 border-gray-100 dark:border-slate-700 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-[8px] font-bold text-white animate-bounce shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotif && (
                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
                  <div className="p-5 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">NOTIFICATIONS</h3>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md">LIVE</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-none">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                        </div>
                        <p className="text-xs font-medium text-gray-400">All caught up! No new notifications.</p>
                      </div>
                    ) : (
                      <div className="p-2 space-y-1">
                        {notifications.map(n => (
                          <div key={n.id} className="p-4 rounded-3xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                            <div className="flex gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</h4>
                                  <span className="text-[10px] font-medium text-gray-400">{n.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium">{n.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button 
                      onClick={() => setNotifications([])}
                      className="w-full py-4 border-t border-gray-50 dark:border-slate-800 text-[10px] font-bold text-gray-400 hover:text-rose-500 dark:hover:text-rose-500 transition-colors uppercase tracking-widest"
                    >
                      Clear all notifications
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-slate-800">
               <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-rose-500 to-rose-400 p-0.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all">
                  <img src="https://ui-avatars.com/api/?name=Aizen+Host&background=fff&color=f43f5e" className="w-full h-full object-cover rounded-[14px]" alt="Avatar" />
               </div>
               <div className="hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Aizen Admin</p>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Super Host</p>
               </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth">
          <div className="max-w-5xl mx-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
