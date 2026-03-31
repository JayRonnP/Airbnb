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

  return { session, loading: session === undefined }
}
