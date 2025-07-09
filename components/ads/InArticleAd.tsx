'use client'

import { useEffect } from 'react'

export function InArticleAd({ className = '' }: { className?: string }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('InArticleAd error:', err)
    }
  }, [])

  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center'
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4876317440241925"
        data-ad-slot="YOUR_IN_ARTICLE_SLOT"
      />
    </div>
  )
}