'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallback() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/?error=auth_callback_error')
          return
        }

        if (data.session) {
          // 登录成功，重定向到首页
          router.push('/')
        } else {
          // 没有session，重定向到首页
          router.push('/?error=no_session')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/?error=auth_callback_error')
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">正在处理登录...</p>
      </div>
    </div>
  )
}