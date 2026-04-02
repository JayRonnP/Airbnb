import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import * as XLSX from 'xlsx'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  // Villa Registry mapping
  const villaNames = {
    '11111111-1111-1111-1111-111111111111': 'Azure Pool Villa',
    '22222222-2222-2222-2222-222222222222': 'Forest Retreat Cabin',
    '33333333-3333-3333-3333-333333333333': 'Beachfront Suite',
    '44444444-4444-4444-4444-444444444444': 'City Loft Studio',
    '55555555-5555-5555-5555-555555555555': 'City Studio',
    '66666666-6666-6666-6666-666666666666': 'City Loft Studio',
  }

  const priceMap = {
    '11111111-1111-1111-1111-111111111111': 4500,
    '22222222-2222-2222-2222-222222222222': 3200,
    '33333333-3333-3333-3333-333333333333': 5800,
    '44444444-4444-4444-4444-444444444444': 2800,
    '55555555-5555-5555-5555-555555555555': 2800,
    '66666666-6666-6666-6666-666666666666': 2800,
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const calculateNights = (from, to) => {
    const start = new Date(from)
    const end = new Date(to)
    const diff = end - start
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const fetchBookings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setBookings(data)
    }
    setLoading(false)
  }

  const handleExportExcel = () => {
    setExporting(true)
    const reportData = bookings.map(b => {
      const nightlyRate = priceMap[b.villa_id] || 2500
      const nights = calculateNights(b.date_from, b.date_to)
      return {
        'Booking ID': b.id.slice(0, 8).toUpperCase(),
        'Guest Name': b.customer_name,
        'Email Address': b.email,
        'Mobile': b.phone,
        'Property': villaNames[b.villa_id] || 'Unknown Stay',
        'Check-In': b.date_from,
        'Check-Out': b.date_to,
        'Duration': `${nights} Nights`,
        'PAX': b.pax,
        'Total Paid (₱)': nightlyRate * nights,
        'Booking Date': new Date(b.created_at).toLocaleDateString()
      }
    })

    const ws = XLSX.utils.json_to_sheet(reportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'All Bookings')
    XLSX.writeFile(wb, 'Aizenbnb_Full_Bookings_Report.xlsx')
    setExporting(false)
  }

  return (
    <>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Bookings</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">Manage your upcoming and past reservations.</p>
        </div>
        <button 
          onClick={handleExportExcel}
          disabled={exporting || bookings.length === 0}
          className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          {exporting ? 'Generating...' : 'Export Excel'}
        </button>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">ID</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Property</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Stay Period</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-medium italic">Loading your bookings...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-medium italic">No reservations found yet.</td></tr>
              ) : (
                bookings.map((booking) => {
                  const nightlyRate = priceMap[booking.villa_id] || 2500
                  const nights = calculateNights(booking.date_from, booking.date_to)
                  const totalPaid = nightlyRate * nights
                  
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-[100px]">{booking.id.slice(0, 8)}...</td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-900 dark:text-white font-bold group-hover:text-rose-500 transition-colors">{booking.customer_name}</p>
                        <p className="text-[10px] text-gray-400 font-medium italic truncate">{booking.email}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-gray-600 dark:text-slate-400 border border-gray-100 dark:border-slate-700">
                          {villaNames[booking.villa_id] || 'Unknown Stay'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-bold text-gray-700 dark:text-slate-300">{booking.date_from}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{nights} nights / {booking.pax}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Confirmed
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-gray-900 dark:text-white">₱{totalPaid.toLocaleString()}</p>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}