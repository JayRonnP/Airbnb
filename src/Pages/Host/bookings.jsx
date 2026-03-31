import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

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

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Bookings</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Manage your upcoming and past reservations.</p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Property</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Check In</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Pax</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-gray-400">Loading bookings...</td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-gray-400">No bookings yet.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400 uppercase truncate max-w-[100px]">{booking.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">{booking.customer_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{booking.villa_id ? 'Villa' : 'Stay'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300">{booking.date_from}</td>
                  <td className="px-6 py-4 text-sm font-medium text-rose-500">Confirmed</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-slate-300 font-medium">{booking.pax}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">₱4,500</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}