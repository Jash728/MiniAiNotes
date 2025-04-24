'use client'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">📝 MiniNotes</h1>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </nav>
  )
}
