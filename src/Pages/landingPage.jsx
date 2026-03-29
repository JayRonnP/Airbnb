import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

function LandingPage() {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('contacts')
      .insert([formData])

    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div id="home" className="min-h-screen flex flex-col gap-6 px-6 py-10">

      {/* Top - Left card + Right contact form */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left card */}
        <div className="w-full lg:w-1/2 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-sm">
          <h1 className="text-rose-500 text-3xl lg:text-5xl font-medium mb-6">Welcome To Aizenbnb</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Welcome To Aizenbnb! This is a landing page for our Airbnb clone project. Here, you can
            find information about our project, explore our features, and get started with booking
            your next stay. We aim to provide a seamless and enjoyable experience for all our users.
            Whether you're looking for a cozy apartment or a luxurious villa, we've got you covered.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right card - Contact Form or Thank You */}
        <div className="w-full lg:w-1/2 bg-white border border-gray-100 rounded-2xl flex flex-col justify-center px-8 py-8 shadow-sm">

          {success ? (
            /* ── Thank You Screen ── */
            <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Thank you for reaching out!</h2>
              <p className="text-sm text-gray-400 max-w-xs">
                We've received your message and will get back to you within 24 hours.
              </p>
              <div className="mt-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-400">
                A confirmation has been sent to <span className="font-medium text-gray-600">{formData.email}</span>
              </div>
            </div>

          ) : (
            /* ── Contact Form ── */
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Get in touch</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6 pl-11">We'll get back to you within 24 hours.</p>

              {/* Error message */}
              {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Juan"
                      required
                      className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Dela Cruz"
                      required
                      className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@example.com"
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all appearance-none"
                  >
                    <option value="" disabled>Choose a topic...</option>
                    <option>General inquiry</option>
                    <option>Support</option>
                    <option>Booking</option>
                    <option>Partnership</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={3}
                    required
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send message →'}
                </button>

                <p className="text-center text-xs text-gray-300">Your info is safe with us. No spam, ever.</p>

              </form>
            </>
          )}

        </div>

      </div>

      {/* Bottom - Video full width */}
      <div id="home" className="w-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm min-h-75 lg:min-h-100 bg-gray-50">
        <video
          src="/bnbVideo.mp4"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  )
}

export default LandingPage