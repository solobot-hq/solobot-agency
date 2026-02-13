'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function usePolling(ms: number = 3000) {
  const router = useRouter()

  useEffect(() => {
    // Create an interval to refresh the server data
    const interval = setInterval(() => {
      router.refresh()
    }, ms)

    // Clean up the interval when the user leaves the page
    return () => clearInterval(interval)
  }, [ms, router])
}