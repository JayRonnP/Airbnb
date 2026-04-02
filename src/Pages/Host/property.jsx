import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

// --- Sub-components (Modals) ---

function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <span className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">Management</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all active:scale-90">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-8 pb-10 pt-2">{children}</div>
      </div>
    </div>
  )
}

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProp, setEditingProp] = useState(null)
  
  // Form States
  const [formData, setFormData] = useState({ name: '', location: '', price: '', description: '' })

  // Static Registry (Fallback/Originals)
  const [villaRegistry, setVillaRegistry] = useState([
    { id: '11111111-1111-1111-1111-111111111111', name: 'Azure Pool Villa', location: 'Tagaytay, Cavite', price: 4500, description: 'Modern lakeside sanctuary with panoramic views and private infinity pool.' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Forest Retreat Cabin', location: 'Baguio, Benguet', price: 3200, description: 'Rustic pine-wood cabin nestled in the heart of the Baguio mountains.' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Beachfront Suite', location: 'Batangas City', price: 5800, description: 'Breathtaking ocean-view suite steps away from crystal clear waters.' },
    { id: '44444444-4444-4444-4444-444444444444', name: 'City Loft Studio', location: 'BGC, Taguig', price: 2800, description: 'Sleek industrial-style studio in the vibrant heart of the metro.' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'City Studio', location: 'Quezon City, Tandang Sora', price: 2800, description: 'Comfortable and accessible urban staycation for weekend trippers.' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'City Loft Studio', location: 'Quezon City, Timog', price: 2800, description: 'Stylish loft near entertainment hubs and SM North district.' },
  ])

  useEffect(() => {
    fetchPropertyData()
  }, [villaRegistry]) // Refresh when registry changes

  const calculateNights = (from, to) => {
    const start = new Date(from)
    const end = new Date(to)
    const diff = end - start
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const parsePax = (paxStr) => {
     if (!paxStr) return 0
     const match = paxStr.match(/\d+/)
     return match ? parseInt(match[0]) : 0
  }

  const fetchPropertyData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('bookings').select('*')
    
    if (!error && data) {
      const today = new Date().toISOString().split('T')[0]
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      const pData = villaRegistry.map(villa => {
        const villaBookings = data.filter(b => b.villa_id === villa.id)
        
        // Calculate MTD Earnings (Month To Date)
        const mtdEarnings = villaBookings.reduce((total, b) => {
          const bDate = new Date(b.date_from)
          if (bDate.getMonth() === currentMonth && bDate.getFullYear() === currentYear) {
            return total + (villa.price * calculateNights(b.date_from, b.date_to))
          }
          return total
        }, 0)

        // Calculate Total Guest (PAX) and Reservations
        const totalGuests = villaBookings.reduce((total, b) => total + parsePax(b.pax), 0)
        const totalReservations = villaBookings.length

        const isOccupied = villaBookings.some(b => today >= b.date_from && today <= b.date_to)

        return { 
          ...villa, 
          status: isOccupied ? 'Occupied' : 'Available', 
          mtdEarnings,
          totalGuests,
          totalReservations
        }
      })
      setProperties(pData)
    }
    setLoading(false)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const newVilla = {
      id: crypto.randomUUID(),
      name: formData.name,
      location: formData.location,
      price: parseInt(formData.price),
      description: formData.description
    }
    setVillaRegistry([...villaRegistry, newVilla])
    setIsAddOpen(false)
    setFormData({ name: '', location: '', price: '', description: '' })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setVillaRegistry(prev => prev.map(v => v.id === editingProp.id ? { ...v, description: formData.description } : v))
    setIsEditOpen(false)
    setEditingProp(null)
  }

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Properties</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Manage your listings and view their individual performance.</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-rose-500/20 active:scale-95 transition-all text-sm"
        >
          + Add Property
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(prop => (
            <div key={prop.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col group hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center text-rose-500 shadow-sm border border-gray-100 dark:border-slate-800">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl ${prop.status === 'Occupied' ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'}`}>{prop.status}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">{prop.name}</h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{prop.location}</p>
              </div>

              {/* Guest Analytics Section */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50/50 dark:bg-slate-800/30 p-4 rounded-3xl border border-gray-50 dark:border-slate-800/50">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest pl-1 mb-1">Guests Booked</p>
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-gray-900 dark:text-white">{prop.totalGuests}</span>
                       <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                       </svg>
                    </div>
                 </div>
                 <div className="bg-gray-50/50 dark:bg-slate-800/30 p-4 rounded-3xl border border-gray-50 dark:border-slate-800/50">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest pl-1 mb-1">Stay Requests</p>
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-gray-900 dark:text-white">{prop.totalReservations}</span>
                       <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                       </svg>
                    </div>
                 </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed italic mb-8 h-8 line-clamp-2">"{prop.description || 'No description provided.'}"</p>

              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">MTD Earnings</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white tracking-tight">₱{prop.mtdEarnings.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => { setEditingProp(prop); setFormData({ ...formData, description: prop.description }); setIsEditOpen(true); }}
                  className="px-4 py-2 bg-gray-50 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-bold text-gray-600 dark:text-slate-300 transition-all active:scale-95"
                >Edit Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Property Modal (Unchanged from previous task but remains for consistency) */}
      <Modal open={isAddOpen} title="Add New Property" onClose={() => setIsAddOpen(false)}>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Property Name</label>
            <input required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Mountain Haven" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
            <input required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, Province" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nightly Rate (₱)</label>
            <input required type="number" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="4500" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea required rows={3} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 rounded-2xl text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe your property..." />
          </div>
          <button type="submit" className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all">Create Listing</button>
        </form>
      </Modal>

      {/* Edit Property Modal (Unchanged from previous task but remains for consistency) */}
      <Modal open={isEditOpen} title={`Edit ${editingProp?.name}`} onClose={() => setIsEditOpen(false)}>
        <form onSubmit={handleEdit} className="space-y-6">
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">MTD Earnings (Read Only)</p>
            <p className="text-xl font-black text-gray-400 dark:text-slate-600 italic">₱{editingProp?.mtdEarnings.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea required rows={5} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800/50 border border-transparent focus:border-rose-500/50 focus:bg-white rounded-2xl text-sm font-medium" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <button type="submit" className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-xl active:scale-[0.98] transition-all">Save Changes</button>
        </form>
      </Modal>
    </>
  )
}