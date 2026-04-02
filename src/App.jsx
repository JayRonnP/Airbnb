import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/footer'
import LandingPage from './Pages/landingPage'
import AboutUs from './Pages/about'
import Staycations from './Pages/staycations'
import Host from './Pages/Host/host'
import HostLayout from './Pages/Host/HostLayout'
import Dashboard from './Pages/Host/hostPortal' // hostPortal now exports Dashboard
import Bookings from './Pages/Host/bookings'
import Properties from './Pages/Host/property'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/useAuth'

const Home = () => (
  <>
    <LandingPage />
    <AboutUs />
    <Staycations limit={2} />
  </>
)

const Layout = () => {
  const { session, loading } = useAuth()
  const location = useLocation()
  
  const isPortal = location.pathname.startsWith('/host-portal')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      {!isPortal && <Header />}
      <Routes>
        {/* Login page — redirect to host portal if already logged in */}
        <Route
          path="/host"
          element={session ? <Navigate to="/host-portal" replace /> : <Host />}
        />

        {/* Host Portal — protected, wrapper with Sidebar */}
        <Route
          path="/host-portal"
          element={
            <ProtectedRoute>
              <HostLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes rendered inside HostLayout's Outlet */}
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="properties" element={<Properties />} />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/all-staycations" element={<div className="pt-16"><Staycations /></div>} />
      </Routes>

      {!isPortal && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App