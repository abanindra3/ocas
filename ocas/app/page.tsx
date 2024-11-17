
'use client'
import './globals.css'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="space-y-4">
        <Button 
          onClick={() => router.push('/admin')}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Admin
        </Button>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Customer
        </Button>
      </div>
    </div>
  )
}