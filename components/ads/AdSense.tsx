'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdSenseProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export function AdSense({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  style, 
  className = '' 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // 推送广告
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4876317440241925"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div className={`adsense-container ${className}`} style={style}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            ...style,
          }}
          data-ad-client="ca-pub-4876317440241925"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </>
  )
}

// 预定义的广告位组件
export function BannerAd({ className }: { className?: string }) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || 'YOUR_BANNER_SLOT_ID'
  return (
    <AdSense
      slot={slot}
      format="horizontal"
      className={className}
      style={{ minHeight: '90px' }}
    />
  )
}

export function SquareAd({ className }: { className?: string }) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SQUARE_SLOT || 'YOUR_SQUARE_SLOT_ID'
  return (
    <AdSense
      slot={slot}
      format="rectangle"
      className={className}
      style={{ minHeight: '250px' }}
    />
  )
}

export function SidebarAd({ className }: { className?: string }) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || 'YOUR_SIDEBAR_SLOT_ID'
  return (
    <AdSense
      slot={slot}
      format="vertical"
      className={className}
      style={{ minHeight: '600px' }}
    />
  )
}