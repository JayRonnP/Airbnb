import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'
import * as XLSX from 'xlsx'

function Sidebar({ onLogout }) {
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
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Bookings
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Properties
        </a>
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

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
          {icon}
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-md ${trend > 0 ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{value}</h3>
    </div>
  )
}

function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBookings, setSelectedBookings] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)

  // Villa ID to price mapping
  const priceMap = {
    '11111111-1111-1111-1111-111111111111': 4500, // Azure Pool Villa
    '22222222-2222-2222-2222-222222222222': 3200, // Forest Retreat Cabin
    '33333333-3333-3333-3333-333333333333': 5800, // Beachfront Suite
    '44444444-4444-4444-4444-444444444444': 2800, // City Loft Studio
    '55555555-5555-5555-5555-555555555555': 2800, // City Studio
    '66666666-6666-6666-6666-666666666666': 2800, // City Loft Studio (another)
  }

  const calculateNights = (from, to) => {
    const start = new Date(from)
    const end = new Date(to)
    const diff = end - start
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  useEffect(() => {
    fetchBookings()
  }, [currentMonth, currentYear])

  const fetchBookings = async () => {
    setLoading(true)
    const firstDay = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0]
    const lastDay = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .lte('date_from', lastDay)
      .gte('date_to', firstDay)

    if (!error) {
      setBookings(data)
    }
    setLoading(false)
  }

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isDateBooked = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookings.some(b => dateStr >= b.date_from && dateStr <= b.date_to)
  }

  const handleDayClick = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const foundBookings = bookings.filter(b => dateStr >= b.date_from && dateStr <= b.date_to)
    
    if (foundBookings.length > 0) {
      setSelectedBookings(foundBookings)
      setSelectedDay(day)
      setIsDrawerOpen(true)
    }
  }

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))

  const handleMonthChange = (e) => {
    setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1))
  }

  const handleYearChange = (e) => {
    setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1))
  }

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

  const getBookingColor = (name) => {
    const colors = [
      'bg-rose-500 border-rose-500 shadow-rose-500/20',
      'bg-indigo-500 border-indigo-500 shadow-indigo-500/20',
      'bg-amber-500 border-amber-500 shadow-amber-500/20',
      'bg-emerald-500 border-emerald-500 shadow-emerald-500/20',
      'bg-violet-500 border-violet-500 shadow-violet-500/20',
      'bg-cyan-500 border-cyan-500 shadow-cyan-500/20',
      'bg-orange-500 border-orange-500 shadow-orange-500/20',
    ]
    // Simple hash to consistently pick a color based on the guest name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const getBookingForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookings.find(b => dateStr >= b.date_from && dateStr <= b.date_to)
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex bg-gray-50 dark:bg-slate-800/50 p-1 rounded-xl border border-gray-100 dark:border-slate-800">
                <button 
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-gray-500 hover:text-rose-500 transition-all active:scale-90"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-gray-500 hover:text-rose-500 transition-all active:scale-90"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 font-medium">
              {loading ? 'Updating bookings...' : 'Real-time booking status'}
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={currentMonth}
                onChange={handleMonthChange}
                className="w-full md:w-40 appearance-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none cursor-pointer transition-all shadow-sm"
              >
                {monthNames.map((month, idx) => (
                  <option key={month} value={idx}>{month}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1 md:flex-none">
              <select 
                value={currentYear}
                onChange={handleYearChange}
                className="w-full md:w-32 appearance-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none cursor-pointer transition-all shadow-sm"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{d}</div>
          ))}
          {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {days.map(d => {
            const booking = getBookingForDate(d)
            const today = new Date()
            const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
            const bookingColorClass = booking ? getBookingColor(booking.customer_name) : ''

            return (
              <div 
                key={d} 
                onClick={() => handleDayClick(d)}
                className={`
                  aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-semibold transition-all cursor-pointer border
                  ${booking 
                    ? `${bookingColorClass} text-white shadow-md` 
                    : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'}
                  ${isToday && !booking ? 'ring-2 ring-rose-500/50 text-rose-600 border-rose-500/30' : ''}
                `}
              >
                {d}
              </div>
            )
          })}
        </div>
        
        <div className="flex gap-4 mt-8 text-xs font-medium text-gray-500 border-t border-gray-50 dark:border-slate-800/50 pt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></div>
                <div className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"></div>
              </div>
              <span>Guest Reservations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700"></div> 
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Live Data (by Guest)</span>
            </div>
        </div>
      </div>

      {/* Booking Details Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out border-l border-gray-100 dark:border-slate-800 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">Reservations</span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {selectedDay} {monthNames[currentMonth]} {currentYear}
              </h2>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-3 bg-gray-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 rounded-2xl transition-all active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-100 dark:scrollbar-thumb-slate-800">
            {selectedBookings.map((booking, idx) => {
              const nightlyRate = priceMap[booking.villa_id] || 2500
              const nights = calculateNights(booking.date_from, booking.date_to)
              const totalEarnings = nightlyRate * nights

              return (
                <div key={booking.id} className="bg-gray-50/50 dark:bg-slate-800/50 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 relative group overflow-hidden animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors" />
                  
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-rose-500 shadow-sm border border-gray-100 dark:border-slate-800">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white leading-none">{booking.customer_name}</h3>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mt-1.5 font-medium italic">{booking.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest pl-1">Property</p>
                      <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold text-gray-700 dark:text-slate-300 border border-gray-100 dark:border-slate-800 inline-block">
                        {booking.villa_id ? 'Azure Pool Villa' : 'Standard stay'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest pl-1">Guests</p>
                      <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-bold text-gray-700 dark:text-slate-300 border border-gray-100 dark:border-slate-800 inline-block">
                        {booking.pax}
                      </div>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest pl-1">Duration</p>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">
                        <span className="text-rose-500">{booking.date_from}</span>
                        <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-rose-500">{booking.date_to}</span>
                        <span className="ml-auto text-[10px] text-gray-400 font-medium">({nights} nights)</span>
                      </div>
                    </div>
                    <div className="col-span-2 pt-4 mt-2 border-t border-gray-100 dark:border-slate-800/50 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Rate / Night</p>
                        <p className="text-sm font-black text-gray-900 dark:text-white">₱{nightlyRate.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1.5">Total Earning</p>
                        <p className="text-xl font-black text-rose-500">₱{totalEarnings.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button 
             onClick={() => setIsDrawerOpen(false)}
             className="mt-8 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-3xl font-bold text-sm shadow-xl active:scale-95 transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
      
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-40 transition-opacity animate-in fade-in duration-300" 
        />
      )}
    </>
  )
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ 
    totalEarnings: 0, 
    activeBookings: 0, 
    profileViews: 1804 // Mock for now, but will make it look realistic later
  })
  const [loading, setLoading] = useState(true)

  // Villa ID to price mapping from staycations.jsx
  const priceMap = {
    '11111111-1111-1111-1111-111111111111': 4500, // Azure Pool Villa
    '22222222-2222-2222-2222-222222222222': 3200, // Forest Retreat Cabin
    '33333333-3333-3333-3333-333333333333': 5800, // Beachfront Suite
    '44444444-4444-4444-4444-444444444444': 2800, // City Loft Studio
    '55555555-5555-5555-5555-555555555555': 2800, // City Studio
    '66666666-6666-6666-6666-666666666666': 2800, // City Loft Studio (another)
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  const calculateNights = (from, to) => {
    const start = new Date(from)
    const end = new Date(to)
    const diff = end - start
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const fetchMetrics = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')

    if (!error && data) {
      const earnings = data.reduce((total, booking) => {
        const nightlyRate = priceMap[booking.villa_id] || 2500 // Default if ID missing
        const nights = calculateNights(booking.date_from, booking.date_to)
        return total + (nightlyRate * nights)
      }, 0)

      setMetrics({
        totalEarnings: earnings,
        activeBookings: data.length,
        profileViews: 1804 // Static mock for now
      })
    }
    setLoading(false)
  }

  const handleExportExcel = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('bookings').select('*')
    
    if (!error && data) {
      const reportData = data.map(b => {
        const nightlyRate = priceMap[b.villa_id] || 2500
        const nights = calculateNights(b.date_from, b.date_to)
        return {
          'Booking ID': b.id.slice(0, 8).toUpperCase(),
          'Guest Name': b.customer_name,
          'Email': b.email,
          'Property': priceMap[b.villa_id] ? (b.villa_id === '11111111-1111-1111-1111-111111111111' ? 'Azure Pool Villa' : 'Forest Retreat Cabin') : 'Staycation', 
          'Check-in': b.date_from,
          'Check-out': b.date_to,
          'Nights': nights,
          'Pax': b.pax,
          'Total Amount (₱)': nightlyRate * nights,
          'Status': 'Confirmed'
        }
      })

      const ws = XLSX.utils.json_to_sheet(reportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Bookings')
      XLSX.writeFile(wb, 'Aizenbnb_Dashboard_Report.xlsx')
    }
    setLoading(false)
  }

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Here's what's happening with your properties today.</p>
        </div>
        
        <button 
          disabled={loading}
          onClick={handleExportExcel}
          className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {loading ? 'Exporting...' : 'Export Excel'}
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Earnings" 
          value={loading ? '...' : `₱${metrics.totalEarnings.toLocaleString()}`} 
          trend={metrics.totalEarnings > 0 ? 12.5 : 0}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Active Bookings" 
          value={loading ? '...' : metrics.activeBookings.toString()} 
          trend={metrics.activeBookings > 0 ? 8.2 : 0}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard 
          title="Profile Views" 
          value={metrics.profileViews.toLocaleString()} 
          trend={-2.4}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
      </div>

      {/* Calendar Area */}
      <BookingCalendar />
    </>
  )
}
