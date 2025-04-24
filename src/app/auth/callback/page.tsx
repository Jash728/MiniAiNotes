'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('OAuth error:', error.message)
      } else if (session) {
        router.push('/notes') 
      }
    }

    handleOAuthRedirect()
  }, [])

  return <p className="text-center p-10">Signing you in...</p>
}
