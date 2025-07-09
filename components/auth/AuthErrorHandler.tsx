'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const error = searchParams.get('error')
    const message = searchParams.get('message')

    if (error) {
      let errorMessage = '登录过程中出现错误'
      
      switch (error) {
        case 'auth_callback_error':
          errorMessage = message ? decodeURIComponent(message) : '登录回调处理失败'
          break
        case 'missing_code':
          errorMessage = '缺少授权代码'
          break
        default:
          errorMessage = '未知错误'
      }

      toast({
        title: '登录失败',
        description: errorMessage,
        variant: 'destructive',
      })

      // 清理 URL 参数
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      url.searchParams.delete('message')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams, toast])

  return null
}

export function AuthErrorHandler() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  )
}