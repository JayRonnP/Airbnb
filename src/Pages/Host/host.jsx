import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../utils/supabaseClient"

function Host() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [isSignUp, setIsSignUp] = useState(() => {
    // Check URL parameters for mode=signup
    const params = new URLSearchParams(window.location.search)
    return params.get('mode') === 'signup'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null })
    setAuthError(null)
  }

  const validate = () => {
    const newErrors = {}

    if (isSignUp) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required."
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required."
      if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required."
      } else if (!/^[0-9+-\s]+$/.test(form.phone)) {
        newErrors.phone = "Enter a valid phone number."
      }
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address."
    }

    if (!isSignUp) {
      if (!form.password) {
        newErrors.password = "Password is required."
      } else if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters."
      }
    }
    return newErrors
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/host`,
      },
    })
    if (error) {
      setAuthError(error.message)
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setAuthError(null)

    let result;
    if (isSignUp) {
      // Magic Link Sign Up
      result = await supabase.auth.signInWithOtp({
        email: form.email.trim(),
        options: {
          data: {
            role: 'guest',
            first_name: form.firstName.trim(),
            last_name: form.lastName.trim(),
            phone: form.phone.trim()
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      })
    } else {
      // Standard sign in
      result = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password,
      })
    }

    const { data, error } = result;
    setLoading(false)

    if (error) {
      setAuthError(error.message ?? "Authentication failed. Please try again.")
      return
    }

    if (!data.session && !isSignUp) {
      setAuthError("Login failed. Please try again.")
      return
    }

    setSuccess(true)

    // Magic link sent! No session exists yet until they click the link.
    if (isSignUp && !data.session) {
      return
    }

    // Normal login flow
    const role = data?.session?.user?.user_metadata?.role || 'host';
    setTimeout(() => navigate(role === 'host' ? '/host-portal' : '/'), 1500)
  }

  return (
    <div
      id="host"
      /* Updated background: uses rose in light, deep navy in dark */
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-50 via-rose-100 to-rose-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans px-6 transition-colors duration-500"
    >
      {/* Decorative blobs - hidden or dimmed in dark mode */}
      <div className="fixed -top-20 -right-20 w-80 h-80 rounded-full bg-rose-400/20 dark:bg-rose-500/10 pointer-events-none blur-2xl" />
      <div className="fixed -bottom-16 -left-16 w-64 h-64 rounded-full bg-rose-300/30 dark:bg-indigo-500/10 pointer-events-none blur-2xl" />

      <div className="w-full max-w-sm z-10">
        {/* Card: White in light, Slate-900 in dark */}
        <div className="relative bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-rose-200/60 dark:shadow-none border border-rose-100 dark:border-slate-800 px-9 pt-11 pb-9">

          <button
            onClick={() => navigate('/')}
            className="absolute top-5 left-5 p-2 text-rose-300 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors rounded-full hover:bg-rose-50 dark:hover:bg-slate-800/50 group"
            title="Back to home"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Logo mark */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-13 h-13 rounded-2xl bg-linear-to-br from-rose-500 to-rose-400 flex items-center justify-center mb-4 shadow-lg shadow-rose-400/40">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-rose-900 dark:text-white tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-rose-800/60 dark:text-slate-400 mt-1">
              {isSignUp ? "Join the Aizenbnb community" : "Sign in to your account"}
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            {isSignUp && (
              <>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-rose-800 dark:text-slate-300 mb-1.5 uppercase tracking-widest">
                      First Name
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused === "firstName" ? "text-rose-500" : "text-rose-300 dark:text-slate-600"}`}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </span>
                      <input
                        name="firstName"
                        type="text"
                        placeholder="First"
                        value={form.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocused('firstName')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-white dark:bg-slate-800/50 text-rose-900 dark:text-white text-sm pl-10 pr-4 py-3.5 rounded-2xl outline-none transition-all duration-300 border ${errors.firstName ? 'border-red-400 dark:border-red-500/50 shadow-sm shadow-red-200/50 dark:shadow-none bg-red-50 dark:bg-red-500/10' : focused === 'firstName' ? 'border-rose-400 dark:border-slate-600 shadow-md shadow-rose-200/50 dark:shadow-none bg-white dark:bg-slate-800' : 'border-rose-100 dark:border-slate-800 hover:border-rose-200 dark:hover:border-slate-700 hover:bg-rose-50/50 dark:hover:bg-slate-800'}`}
                      />
                    </div>
                    {errors.firstName && <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 animate-in fade-in">{errors.firstName}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-rose-800 dark:text-slate-300 mb-1.5 uppercase tracking-widest">
                      Last Name
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused === "lastName" ? "text-rose-500" : "text-rose-300 dark:text-slate-600"}`}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </span>
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Last"
                        value={form.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocused('lastName')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-white dark:bg-slate-800/50 text-rose-900 dark:text-white text-sm pl-10 pr-4 py-3.5 rounded-2xl outline-none transition-all duration-300 border ${errors.lastName ? 'border-red-400 dark:border-red-500/50 shadow-sm shadow-red-200/50 dark:shadow-none bg-red-50 dark:bg-red-500/10' : focused === 'lastName' ? 'border-rose-400 dark:border-slate-600 shadow-md shadow-rose-200/50 dark:shadow-none bg-white dark:bg-slate-800' : 'border-rose-100 dark:border-slate-800 hover:border-rose-200 dark:hover:border-slate-700 hover:bg-rose-50/50 dark:hover:bg-slate-800'}`}
                      />
                    </div>
                    {errors.lastName && <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 animate-in fade-in">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-800 dark:text-slate-300 mb-1.5 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused === "phone" ? "text-rose-500" : "text-rose-300 dark:text-slate-600"}`}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+63 912 345 6789"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-white dark:bg-slate-800/50 text-rose-900 dark:text-white text-sm pl-10 pr-4 py-3.5 rounded-2xl outline-none transition-all duration-300 border ${errors.phone ? 'border-red-400 dark:border-red-500/50 shadow-sm shadow-red-200/50 dark:shadow-none bg-red-50 dark:bg-red-500/10' : focused === 'phone' ? 'border-rose-400 dark:border-slate-600 shadow-md shadow-rose-200/50 dark:shadow-none bg-white dark:bg-slate-800' : 'border-rose-100 dark:border-slate-800 hover:border-rose-200 dark:hover:border-slate-700 hover:bg-rose-50/50 dark:hover:bg-slate-800'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1.5 ml-1 animate-in fade-in">{errors.phone}</p>}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-rose-800 dark:text-slate-300 mb-1.5 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused === "email" ? "text-rose-500" : "text-rose-300 dark:text-slate-600"}`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
                    ${errors.email
                      ? "border-red-400 bg-red-50 dark:bg-red-500/5 ring-2 ring-red-400/20 text-rose-900 dark:text-white"
                      : focused === "email"
                        ? "border-rose-500 bg-rose-50 dark:bg-rose-500/5 ring-2 ring-rose-500/15 text-rose-900 dark:text-white"
                        : "border-rose-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-rose-900 dark:text-slate-200 hover:border-rose-300 dark:hover:border-slate-700"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            {!isSignUp && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-rose-800 dark:text-slate-300 uppercase tracking-widest">
                    Password
                  </label>
                  <a href="#" className="font-bold text-[10px] sm:text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors uppercase tracking-wider bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 px-2 py-1 rounded-md">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${focused === "password" ? "text-rose-500" : "text-rose-300 dark:text-slate-600"}`}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200
                      ${errors.password
                        ? "border-red-400 bg-red-50 dark:bg-red-500/5 ring-2 ring-red-400/20 text-rose-900 dark:text-white"
                        : focused === "password"
                          ? "border-rose-500 bg-rose-50 dark:bg-rose-500/5 ring-2 ring-rose-500/15 text-rose-900 dark:text-white"
                          : "border-rose-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-rose-900 dark:text-slate-200 hover:border-rose-300 dark:hover:border-slate-700"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300 dark:text-slate-600 hover:text-rose-500 transition-colors duration-200 flex items-center"
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                    {errors.password}
                  </p>
                )}
              </div>
            )}

            {/* Auth error banner */}
            {authError && (
              <div className="flex items-center gap-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{authError}</p>
              </div>
            )}

            {/* Success banner */}
            {success && (
              <div className="flex items-center gap-2.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {isSignUp ? "Success! Check your email for the confirmation link." : "Login successful! Redirecting…"}
                </p>
              </div>
            )}

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <a href="#" className="text-xs text-rose-500 font-medium hover:text-rose-400 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || success}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-400/40 transition-all duration-150 mt-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                  {isSignUp ? "Signing up…" : "Signing in…"}
                </>
              ) : (
                isSignUp ? "Send Email Confirmation" : "Sign In"
              )}
            </button>
          </div>

          {/* Conditional Google Sign Up Actions */}
          {isSignUp && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-rose-100 dark:bg-slate-800" />
                <span className="text-xs text-rose-300 dark:text-slate-500">or sign up with</span>
                <div className="flex-1 h-px bg-rose-100 dark:bg-slate-800" />
              </div>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-rose-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:bg-rose-50 dark:hover:bg-slate-800 text-rose-900 dark:text-slate-200 text-sm font-medium transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.27 9.77A7.3 7.3 0 0 1 12 4.73c1.8 0 3.42.65 4.69 1.7l3.49-3.49A12 12 0 0 0 .1 9.48l5.17 4.02c-.01 0 0-3.73 0-3.73z" />
                  <path fill="#FBBC05" d="M5.27 14.23l-5.17 4.02A11.96 11.96 0 0 0 12 24c3.24 0 5.96-1.18 7.96-3.09l-4.91-3.81a7.12 7.12 0 0 1-3.05.68 7.3 7.3 0 0 1-6.73-3.55z" />
                  <path fill="#4285F4" d="M23.76 12.27c0-.8-.07-1.57-.2-2.27H12v4.3h6.6a5.64 5.64 0 0 1-2.44 3.7l4.91 3.81C23.04 19.63 23.76 16.13 23.76 12.27z" />
                  <path fill="#34A853" d="M12 24a11.96 11.96 0 0 0 8-3.09l-4.91-3.81A7.3 7.3 0 0 1 5.27 14.23L.1 18.25A11.96 11.96 0 0 0 12 24z" />
                </svg>
                Sign up with Google
              </button>
            </>
          )}

          {/* Sign up */}
          <p className="text-center mt-6 text-sm text-rose-800/60 dark:text-slate-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-rose-500 font-semibold hover:text-rose-400 transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Host