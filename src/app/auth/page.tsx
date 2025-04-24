'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const signInWithGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback' 
      }
    })
    if (error) alert(error.message)
    setLoading(false)
  }
  

  const handleAuth = async () => {
    setLoading(true)
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) alert(error.message)
    else router.push('/notes')
    setLoading(false)
  }

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (
        session?.user?.email_confirmed_at ||
        (session?.user?.identities?.length ?? 0) > 0
      ) {
        router.push('/notes')
      }
      
    }

    checkSession()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 space-y-5 px-4">
      <h1 className="text-3xl font-bold text-gray-800">MiniNotes</h1>
      <p className="text-sm text-gray-500">{isLogin ? 'Sign in to continue' : 'Create your account'}</p>

      <input
        type="email"
        placeholder="Email"
        className="cursor-pointer p-3 border border-gray-300 rounded-xl w-full max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border border-gray-300 rounded-xl w-full max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleAuth} disabled={loading} className="w-full max-w-xs">
        {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
      </Button>

      <Button variant="outline" onClick={() => setIsLogin(!isLogin)} className="w-full max-w-xs">
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
      </Button>

      <div className="text-sm text-gray-500">or</div>

      <Button onClick={signInWithGoogle} variant="outline" disabled={loading} className="w-full max-w-xs">
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </Button>
    </div>
  )
}
