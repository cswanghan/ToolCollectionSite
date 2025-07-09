import { createBrowserClient } from '@supabase/ssr'
import { Database } from './types'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  
  // 清理API key中的换行符和空格
  const cleanKey = key.replace(/\s+/g, '').trim()
  
  return createBrowserClient<Database>(url, cleanKey)
}