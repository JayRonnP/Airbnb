import { useNavigate } from 'react-router-dom'

export default function WelcomeModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-10 flex flex-col items-center text-center relative z-10">
          
          {/* Brand Mark */}
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-rose-500 to-rose-400 flex items-center justify-center mb-8 shadow-xl shadow-rose-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill="white" />
            </svg>
          </div>

          <h2 className="text-3xl font-black text-rose-900 dark:text-white tracking-tight mb-4">
            Welcome to Aizenbnb
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-10 max-w-[320px]">
             Discover handpicked premium staycations and luxurious villas. <br/>
             Join our community to start your journey.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={() => { onClose(); navigate('/host?mode=signup'); }}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-500/20 active:scale-[0.98] transition-all"
            >
              Sign Up for Free
            </button>
            <button 
              onClick={() => { onClose(); navigate('/host'); }}
              className="w-full py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-700 active:scale-[0.98] transition-all"
            >
              Log In
            </button>
            <button 
              onClick={onClose}
              className="mt-2 text-xs font-bold text-gray-400 dark:text-slate-500 hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
              Only Browse
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
