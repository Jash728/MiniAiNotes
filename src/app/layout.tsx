"use client"
import './globals.css'
import { Providers } from './providers'
import { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  if (!isClient) {
    return (
      <html lang="en">
        <body>
        
          <div>Loading...</div>
        </body>
      </html>
    )
  }


  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
