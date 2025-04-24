'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-white text-center">
      <h1 className="text-4xl font-bold mb-4">📝 Mini AI Notes</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Capture your ideas. Let AI summarize them. Simple, clean, and always synced to the cloud.
      </p>
      <div className="flex gap-4 flex-col sm:flex-row">
      
        <Button variant="outline" onClick={() => router.push('/auth')} className="text-lg px-6 py-3">
          Login / Sign Up
        </Button>
      </div>
    </main>
  )
}
