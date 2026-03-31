import { useState } from 'react'
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

  if (!open || !stay) return null

  const resetModal = () => {
    setForm(initialForm)
    setError(null)
    setSuccess(false)
    setLoading(false)
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
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start relative z-10">
          <div>
            <span className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">Reservation</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none group">
              Book <span className="text-rose-500">{stay.name}</span>
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-medium">
              Complete the form below to secure your stay.
            </p>
          </div>
          <button 
            onClick={handleClose} 
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-8 pt-4 pb-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Booking Sent!</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-3 max-w-[280px]">
              Your request for <span className="text-rose-500 font-semibold">{stay.name}</span> is being processed. Check your email for updates.
            </p>
            <button
              onClick={() => {
                onBooked?.(stay.name)
                handleClose()
              }}
              className="mt-8 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Great, thanks!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 pb-10 pt-2 space-y-5 relative z-10">
            {/* Name Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="customer_name"
                  placeholder="e.g. John Doe"
                  value={form.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone Input */}
              <div className="space-y-1.5 group sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Phone Number (Optional)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+63 9xx xxx xxxx"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-in Input */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Check-in</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="date_from"
                    value={form.date_from}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-out Input */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Check-out</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="date_to"
                    value={form.date_to}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-5 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Pax Selection */}
              <div className="space-y-1.5 group sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Number of Guests</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    name="pax"
                    value={form.pax}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="2pax">2 PAX (Standard Stay)</option>
                    <option value="4pax">4 PAX (Small Group)</option>
                    <option value="6pax">6 PAX (Family Size)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Confirming...
                  </>
                ) : 'Confirm Booking Request'}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-4 text-sm font-bold text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Maybe later
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}