'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    // 检查是否已有同意记录
    const consent = localStorage.getItem('cookie-consent')
    if (consent === null) {
      setShowBanner(true)
    } else {
      setHasConsent(consent === 'true')
      // 如果用户已同意，加载广告
      if (consent === 'true') {
        loadAds()
      }
    }
  }, [])

  const loadAds = () => {
    // 触发广告加载
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }
  }

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setHasConsent(true)
    setShowBanner(false)
    loadAds()
    
    // 发送同意信号给Google
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      })
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'false')
    setHasConsent(false)
    setShowBanner(false)
    
    // 发送拒绝信号给Google
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      })
    }
  }

  const handleCustomize = () => {
    // 可以扩展为更详细的设置页面
    const customConsent = confirm('是否允许个性化广告？')
    if (customConsent) {
      handleAccept()
    } else {
      handleReject()
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">我们重视您的隐私</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              我们使用Cookie来提升您的浏览体验、展示个性化广告和分析网站流量。
              点击"接受所有"即表示您同意我们使用Cookie。您也可以点击"自定义"来管理您的偏好。
              <a href="/privacy" className="underline ml-1">了解更多</a>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
            >
              拒绝所有
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCustomize}
            >
              自定义
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
            >
              接受所有
            </Button>
          </div>
          
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0"
            aria-label="关闭"
          >
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}