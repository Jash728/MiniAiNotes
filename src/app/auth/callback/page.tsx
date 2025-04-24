'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuth = async () => {
      // Capture access_token and refresh_token from URL fragment
      const url = new URL(window.location.href)
      const accessToken = url.hash?.split('&').find(param => param.startsWith('access_token'))?.split('=')[1]
      const refreshToken = url.hash?.split('&').find(param => param.startsWith('refresh_token'))?.split('=')[1]

      if (accessToken && refreshToken) {
        // Set the session with both access_token and refresh_token
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        // Redirect to /notes after setting the session
        router.replace('/notes')
      } else {
        console.error('No access_token or refresh_token found')
        router.replace('/auth') // fallback if no tokens are found
      }
    }

    handleAuth()
  }, [router, supabase])

  return <p>Redirecting...</p>
}
