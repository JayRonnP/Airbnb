import { useState } from 'react'
import BookingModal from '../components/bookingModal'
import WelcomeModal from '../components/WelcomeModal'
import { useAuth } from '../hooks/useAuth'

const PUBLIC_BASE = import.meta.env.BASE_URL

const staycations = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Azure Pool Villa',
    location: 'Tagaytay, Cavite',
    price: 4500,
    rating: 4.9,
    reviews: 128,
    tag: 'Most Popular',
    image: `${PUBLIC_BASE}bnb1.jpg`,
    amenities: ['Pool', 'WiFi', 'Kitchen'],
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Forest Retreat Cabin',
    location: 'Baguio, Benguet',
    price: 3200,
    rating: 4.8,
    reviews: 94,
    tag: 'Nature Escape',
    image: `${PUBLIC_BASE}bnb2.jpg`,
    amenities: ['Fireplace', 'WiFi', 'Garden'],
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Beachfront Suite',
    location: 'Batangas City',
    price: 5800,
    rating: 4.7,
    reviews: 210,
    tag: 'Beachside',
    image: `${PUBLIC_BASE}bnb3.jpg`,
    amenities: ['Beach Access', 'Pool', 'Bar'],
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'City Loft Studio',
    location: 'BGC, Taguig',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'Urban Stay',
    image: `${PUBLIC_BASE}bnb4.jpg`,
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'City Studio',
    location: 'Quezon City, Tandang Sora',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'Urban Stay',
    image: `${PUBLIC_BASE}bnb5.jpg`,
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'City Loft Studio',
    location: 'Quezon City, Timog',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'SM North Stay',
    image: `${PUBLIC_BASE}bnb6.jpg`,
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
]

const VISIBLE = 2

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-rose-400 text-rose-400" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StaycationCard({ stay, onBook }) {
  return (
    <div className="w-80 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={stay.image}
          alt={stay.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider">
          {stay.tag}
        </div>

        <div className="absolute bottom-3 right-3 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
          ₱{stay.price.toLocaleString()}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{stay.name}</h3>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{stay.location}</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
            <StarIcon />
            <span className="text-xs font-bold dark:text-slate-200">{stay.rating}</span>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {stay.amenities.map((amenity) => (
            <span key={amenity} className="text-[10px] font-medium text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-2.5 py-0.5 rounded-full">
              {amenity}
            </span>
          ))}
        </div>

        <button
          onClick={() => onBook(stay)}
          className="mt-2 w-full py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-lg bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600"
        >
          Reserve Now
        </button>
      </div>
    </div>
  )
}

function Staycations({ limit }) {
  const { session } = useAuth()
  const [toast, setToast] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [selectedStay, setSelectedStay] = useState(null)

  const handleBook = (stay) => {
    if (!session) {
      setWelcomeOpen(true)
      return
    }
    setSelectedStay(stay)
    setModalOpen(true)
  }

  const handleBooked = (stayName) => {
    setToast(stayName)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="px-6 py-12 transition-colors duration-500 dark:bg-slate-950">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 dark:border-slate-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {toast} booked successfully!
          </div>
        </div>
      )}

      {/* Header Section */}
      <div id="airbnb" className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-rose-500 font-bold text-xs uppercase tracking-widest mb-2 block">Our Top Picks</span>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Aizen Staycations</h1>
        </div>

      </div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {staycations.slice(0, limit || staycations.length).map((stay) => (
          <StaycationCard
            key={stay.id}
            stay={stay}
            onBook={handleBook}
          />
        ))}
      </div>

      <WelcomeModal isOpen={welcomeOpen} onClose={() => setWelcomeOpen(false)} />

      <BookingModal
        open={modalOpen}
        stay={selectedStay}
        onClose={() => setModalOpen(false)}
        onBooked={(stayName) => {
          setModalOpen(false)
          handleBooked(stayName)
        }}
      />
    </div>
  )
}

export default Staycations