import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

const initialForm = {
  customer_name: '',
  email: '',
  phone: '',
  date_from: '',
  date_to: '',
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
      stay_id: stay.id,
      stay_name: stay.name,
      customer_name: form.customer_name,
      email: form.email,
      phone: form.phone,
      date_from: form.date_from,
      date_to: form.date_to,
    }])

    if (error) {
      setError('Booking failed. Please try again.')
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 text-center">
          <div className="text-4xl">✅</div>
          <h2 className="text-xl font-semibold">Booking request sent!</h2>
          <p className="text-sm text-zinc-500">
            Your booking for <span className="font-medium">{stay.name}</span> is now pending.
            We’ll follow up by email soon.
          </p>
          <button
            onClick={() => {
              onBooked?.(stay.name)
              handleClose()
            }}
            className="w-full bg-rose-600 text-white rounded-xl py-3 px-6 font-semibold shadow hover:bg-rose-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Book {stay.name}</h2>
          <button onClick={handleClose} className="text-zinc-500 hover:text-zinc-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-zinc-700">Name</label>
            <input
              type="text"
              name="customer_name"
              id="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              required
              className="w-full mt-1 border-zinc-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 border-zinc-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">Phone (Optional)</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 border-zinc-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date_from" className="block text-sm font-medium text-zinc-700">From</label>
              <input
                name="date_from"
                id="date_from"
                type="date"
                value={form.date_from}
                onChange={handleChange}
                required
                className="w-full mt-1 border-zinc-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            <div>
              <label htmlFor="date_to" className="block text-sm font-medium text-zinc-700">To</label>
              <input
                name="date_to"
                id="date_to"
                type="date"
                value={form.date_to}
                onChange={handleChange}
                required
                className="w-full mt-1 border-zinc-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white rounded-xl py-3 px-6 font-semibold shadow hover:bg-rose-700 transition-colors disabled:bg-rose-400"
          >
            {loading ? 'Booking...' : 'Confirm booking'}
          </button>
        </form>
        <button
          onClick={handleClose}
          className="w-full text-center text-zinc-600 hover:text-rose-500 pt-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}