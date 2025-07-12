'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// 声明 window.adsbygoogle 类型
declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}

export function AutoAds() {
  useEffect(() => {
    // 检查是否已有用户同意
    const consent = localStorage.getItem('cookie-consent')
    if (consent !== 'true') {
      console.log('AutoAds: 用户未同意Cookie，不加载广告')
      return
    }

    // 启用自动广告
    try {
      if (typeof window !== 'undefined') {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({
          google_ad_client: "ca-pub-4876317440241925",
          enable_page_level_ads: true
        });
        console.log('AutoAds: 自动广告已启用')
      }
    } catch (err) {
      console.error('AutoAds error:', err)
    }
  }, [])

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4876317440241925"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AutoAds: AdSense脚本加载完成')
        }}
        onError={() => {
          console.error('AutoAds: AdSense脚本加载失败')
        }}
      />
    </>
  )
}