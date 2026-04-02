import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function useAuth() {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    // Get the current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const explicitRole = session?.user?.user_metadata?.role;
  const provider = session?.user?.app_metadata?.provider;
  
  // If role isn't explicitly set in metadata, check if they used Google (guests).
  // Otherwise, fallback to 'host' for legacy email users.
  const userRole = explicitRole || (provider === 'google' ? 'guest' : 'host');

  return { session, loading: session === undefined, userRole }
}
