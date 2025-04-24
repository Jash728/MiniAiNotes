'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { Session } from '@supabase/supabase-js'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.replace('/notes') // ✅ redirect here after login
      } else {
        console.error('No session found')
        router.replace('/auth') // fallback in case session fails
      }
    }

    handleAuth()
  }, [router])

  return <p>Redirecting...</p>
}
