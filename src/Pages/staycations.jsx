import { useState } from 'react'
import BookingModal from '../components/bookingModal'

const staycations = [
  {
    id: 1,
    name: 'Azure Pool Villa',
    location: 'Tagaytay, Cavite',
    price: 4500,
    rating: 4.9,
    reviews: 128,
    tag: 'Most Popular',
    image: '/bnb1.jpg',
    amenities: ['Pool', 'WiFi', 'Kitchen'],
  },
  {
    id: 2,
    name: 'Forest Retreat Cabin',
    location: 'Baguio, Benguet',
    price: 3200,
    rating: 4.8,
    reviews: 94,
    tag: 'Nature Escape',
    image: '/bnb2.jpg',
    amenities: ['Fireplace', 'WiFi', 'Garden'],
  },
  {
    id: 3,
    name: 'Beachfront Suite',
    location: 'Batangas City',
    price: 5800,
    rating: 4.7,
    reviews: 210,
    tag: 'Beachside',
    image: '/bnb3.jpg',
    amenities: ['Beach Access', 'Pool', 'Bar'],
  },
  {
    id: 4,
    name: 'City Loft Studio',
    location: 'BGC, Taguig',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'Urban Stay',
    image: '/bnb4.jpg',
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
  {
    id: 5,
    name: 'City Studio',
    location: 'Quezon City, Tandang Sora',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'Urban Stay',
    image: '/bnb5.jpg',
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
  {
    id: 6,
    name: 'City Loft Studio',
    location: 'Quezon City, Timog',
    price: 2800,
    rating: 4.6,
    reviews: 76,
    tag: 'SM North Stay',
    image: '/bnb6.jpg',
    amenities: ['WiFi', 'Gym', 'Rooftop'],
  },
]

const VISIBLE = 2

function StarIcon() {
  return (
    <svg className="w-3 h-3 fill-rose-400 text-rose-400 inline-block" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StaycationCard({ stay, onBook }) {
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    setBooked(true)
    onBook(stay)
    setTimeout(() => setBooked(false), 2000)
  }

  return (
    <div className="w-72 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={stay.image}
          alt={stay.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />

        <span className="absolute top-3 left-3 bg-white text-rose-500 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
          {stay.tag}
        </span>

        <span className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-sm">
          ₱{stay.price.toLocaleString()}/night
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{stay.name}</h3>
          <p className="text-xs text-gray-400">{stay.location}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon />
          <span className="text-xs font-semibold">{stay.rating}</span>
          <span className="text-xs text-gray-400">({stay.reviews})</span>
        </div>

        <div className="flex gap-1 flex-wrap">
          {stay.amenities.map((amenity) => (
            <span key={amenity} className="text-[10px] bg-gray-50 border px-2 py-0.5 rounded-full">
              {amenity}
            </span>
          ))}
        </div>

        <button
          onClick={handleBook}
          className={`mt-1 w-full py-2 rounded-xl text-sm font-semibold ${
            booked ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'
          }`}
        >
          {booked ? '✓ Booked!' : 'Book Now'}
        </button>
      </div>
    </div>
  )
}

function Staycations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [toast, setToast] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStay, setSelectedStay] = useState(null)

  const scroll = (dir) => {
    const nextIndex = currentIndex + dir
    if (nextIndex < 0 || nextIndex > staycations.length - VISIBLE) return
    setCurrentIndex(nextIndex)
  }

  const handleBook = (stay) => {
    setSelectedStay(stay)
    setModalOpen(true)
  }

  const handleBooked = (stayName) => {
    setToast(stayName)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="px-6 py-10">
      {toast && (
        <div className="fixed top-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl">
          {toast} has been booked!
        </div>
      )}

      <div id="airbnb" className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-rose-500">AizenStaycations</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {currentIndex + 1}–{Math.min(currentIndex + VISIBLE, staycations.length)} of {staycations.length}
          </span>

          <button onClick={() => scroll(-1)} disabled={currentIndex === 0}>
            ←
          </button>

          <button
            onClick={() => scroll(1)}
            disabled={currentIndex >= staycations.length - VISIBLE}
          >
            →
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        {staycations.slice(currentIndex, currentIndex + VISIBLE).map((stay) => (
          <StaycationCard
            key={stay.id}
            stay={stay}
            onBook={handleBook}
          />
        ))}
      </div>

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