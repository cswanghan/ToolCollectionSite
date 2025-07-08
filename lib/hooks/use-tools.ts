'use client'

import { useEffect, useState } from 'react'
import { getTools, ToolWithCategory } from '@/lib/services/tools'

export function useTools(options?: {
  categoryId?: string
  featured?: boolean
  search?: string
  sortBy?: 'name' | 'clicks' | 'recent'
  sortOrder?: 'asc' | 'desc'
}) {
  const [tools, setTools] = useState<ToolWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTools() {
      try {
        setLoading(true)
        const data = await getTools(options)
        setTools(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tools')
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [options?.categoryId, options?.featured, options?.search, options?.sortBy, options?.sortOrder])

  return { tools, loading, error }
}