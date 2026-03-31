import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'

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

function MockCalendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const today = 15
  const booked = [12, 13, 14, 21, 22, 28]

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm mt-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Booking Calendar</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Select a date to view details</p>
        </div>
        <div className="flex gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Booked</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"></div> Available</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{d}</div>
        ))}
        {Array(3).fill(null).map((_, i) => <div key={`empty-${i}`} />)} {/* Offset padding */}
        {days.map(d => {
          const isBooked = booked.includes(d)
          const isToday = d === today
          
          return (
            <div 
              key={d} 
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-semibold transition-all cursor-pointer border
                ${isBooked 
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20' 
                  : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'}
                ${isToday && !isBooked ? 'ring-2 ring-rose-500/50 text-rose-600' : ''}
              `}
            >
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Here's what's happening with your properties today.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Export Report
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Earnings" 
          value="₱124,500" 
          trend={12.5}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Active Bookings" 
          value="24" 
          trend={8.2}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard 
          title="Profile Views" 
          value="1,804" 
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
      <MockCalendar />
    </>
  )
}
