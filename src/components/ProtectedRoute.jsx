import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * Wraps any route that requires authentication.
 * - Shows nothing while session is loading
 * - Redirects to /host (login page) if not authenticated
 * - Renders children if authenticated
 */
function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <svg className="animate-spin h-8 w-8 text-rose-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/host" replace />
  }

  return children
}

export default ProtectedRoute
