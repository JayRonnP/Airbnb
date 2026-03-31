import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

const PUBLIC_BASE = import.meta.env.BASE_URL

function LandingPage() {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '', subject: '', message: ''
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
    const { error } = await supabase.from('contacts').insert([formData])
    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div id="home" className="min-h-screen flex flex-col gap-6 px-6 py-10 transition-colors duration-500 dark:bg-slate-950">

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Welcome Card */}
        <div className="w-full lg:w-1/2 border border-gray-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-10 shadow-sm bg-white dark:bg-slate-900/50 backdrop-blur-sm">
          <h1 className="text-rose-500 dark:text-rose-400 text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Welcome To Aizenbnb
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md">
            Your seamless journey to finding the perfect stay starts here. From cozy apartments to luxurious villas, we provide an experience tailored to you.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/all-staycations"
              className="px-8 py-3 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
            >
              Get Started
            </Link>
            <button className="px-8 py-3 border border-gray-200 dark:border-slate-700 dark:text-white rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Contact Card */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl flex flex-col justify-center px-8 py-10 shadow-sm relative overflow-hidden">
          
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success!</h2>
              <p className="text-gray-500 dark:text-slate-400 mt-2">Check your email: <span className="text-rose-500 font-medium">{formData.email}</span></p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in touch</h2>
                  <p className="text-sm text-gray-400 dark:text-slate-500">Fast response within 24 hours.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                {/* First Name */}
                <div className="relative col-span-1">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">First name</label>
                  <input type="text" name="first_name" onChange={handleChange} required className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" />
                </div>
                {/* Last Name */}
                <div className="relative col-span-1">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Last name</label>
                  <input type="text" name="last_name" onChange={handleChange} required className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" />
                </div>
                {/* Email */}
                <div className="relative col-span-2">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Email address</label>
                  <input type="email" name="email" onChange={handleChange} required className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" />
                </div>
                {/* Subject */}
                <div className="relative col-span-2">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Subject</label>
                  <select name="subject" onChange={handleChange} defaultValue="" required className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:outline-none appearance-none">
                    <option value="" disabled>Choose a topic...</option>
                    <option className="dark:bg-slate-900">General inquiry</option>
                    <option className="dark:bg-slate-900">Support</option>
                    <option className="dark:bg-slate-900">Booking</option>
                  </select>
                </div>
                {/* Message */}
                <div className="relative col-span-2">
                  <label className="absolute -top-2 left-3 bg-white dark:bg-slate-900 px-1 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Message</label>
                  <textarea name="message" onChange={handleChange} rows={3} required className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none" />
                </div>
                {/* Submit */}
                <button type="submit" disabled={loading} className="col-span-2 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 transition-all disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm aspect-video bg-gray-50 dark:bg-slate-900">
        <video
          src={`${PUBLIC_BASE}bnbVideo.mp4`}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default LandingPage