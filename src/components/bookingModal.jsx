import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const initialForm = {
  customer_name: '',
  email: '',
  phone: '',
  date_from: '',
  date_to: '',
  pax: '2pax',
}

export default function BookingModal({ open, stay, onClose, onBooked }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (form.date_from && form.date_to && stay?.price) {
      const start = new Date(form.date_from)
      const end = new Date(form.date_to)
      const diff = end - start
      const calculatedNights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
      
      if (calculatedNights > 0) {
        setNights(calculatedNights)
        setTotalPrice(calculatedNights * stay.price)
        setError(null)
      } else if (form.date_from && form.date_to) {
        setNights(0)
        setTotalPrice(0)
        setError('Check-out must be after check-in date.')
      }
    } else {
      setNights(0)
      setTotalPrice(0)
    }
  }, [form.date_from, form.date_to, stay?.price])

  if (!open || !stay) return null

  const resetModal = () => {
    setForm(initialForm)
    setError(null)
    setSuccess(false)
    setLoading(false)
    setNights(0)
    setTotalPrice(0)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (nights <= 0) {
      setError('Please select a valid stay duration.')
      return
    }
    
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('bookings').insert([{
      villa_id: stay.id,
      customer_name: form.customer_name,
      email: form.email,
      phone: form.phone,
      date_from: form.date_from,
      date_to: form.date_to,
      pax: form.pax,
    }])

    if (error) {
      setError('Booking failed. Please try again.')
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl shadow-rose-500/10 border border-gray-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="px-8 pt-8 pb-4 flex justify-between items-start relative z-10">
          <div>
            <span className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">Reservation</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none group">
              Book <span className="text-rose-500">{stay.name}</span>
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-medium">Complete the form below to secure your stay.</p>
          </div>
          <button onClick={handleClose} className="p-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 pt-4 pb-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Booking Sent!</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-3 max-w-[280px]">Your request for <span className="text-rose-500 font-semibold">{stay.name}</span> is being processed.</p>
            <button onClick={() => { onBooked?.(stay.name); handleClose(); }} className="mt-8 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-bold text-sm shadow-xl active:scale-95">Great, thanks!</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 pb-10 pt-2 space-y-5 relative z-10">
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input required type="text" name="customer_name" placeholder="e.g. John Doe" value={form.customer_name} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm font-medium outline-none transition-all" />
            </div>
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input required type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm font-medium outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Check-in</label>
                <input required type="date" name="date_from" value={form.date_from} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm font-medium outline-none transition-all" />
              </div>
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Check-out</label>
                <input required type="date" name="date_to" value={form.date_to} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm font-medium outline-none transition-all" />
              </div>
            </div>

            {/* Price Preview Section */}
            {(nights > 0) && (
              <div className="p-5 bg-rose-500/5 dark:bg-rose-500/10 rounded-3xl border border-rose-500/20 animate-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Total Stay Duration</p>
                  </div>
                  <span className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-lg shadow-md shadow-rose-500/20">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                </div>
                <div className="flex justify-between items-end border-t border-rose-500/10 pt-4 mt-1">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pricing Breakdown</p>
                    <p className="text-xs font-bold text-gray-600 dark:text-slate-400 mt-1">₱{stay.price.toLocaleString()} × {nights} nights</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Grand Total</p>
                    <p className="text-2xl font-black text-rose-500 leading-none">₱{totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading || (nights <= 0)} className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 dark:disabled:bg-slate-800 disabled:text-gray-400 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              {loading ? 'Confirming...' : 'Confirm Booking Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}