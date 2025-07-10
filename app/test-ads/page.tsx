'use client'

import { BannerAd, SquareAd, SidebarAd } from '@/components/ads/AdSense'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestAdsPage() {
  const [showRealAds, setShowRealAds] = useState(false)
  const [adStatus, setAdStatus] = useState<Record<string, string>>({})

  // 检查AdSense状态
  const checkAdSenseStatus = () => {
    const status: Record<string, string> = {}
    
    // 检查AdSense脚本是否加载
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      status.script = '✅ AdSense脚本已加载'
    } else {
      status.script = '❌ AdSense脚本未加载'
    }
    
    // 检查广告单元
    const adUnits = document.querySelectorAll('.adsbygoogle')
    status.units = `找到 ${adUnits.length} 个广告单元`
    
    // 检查Cookie同意
    const consent = localStorage.getItem('cookie-consent')
    status.consent = consent === 'true' ? '✅ 已同意Cookie' : consent === 'false' ? '❌ 已拒绝Cookie' : '⚠️ 未设置Cookie同意'
    
    // 检查环境变量
    status.publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ? '✅ Publisher ID已配置' : '❌ Publisher ID未配置'
    
    setAdStatus(status)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AdSense 测试页面</h1>
      
      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">AdSense 状态检查</h2>
        <Button onClick={checkAdSenseStatus} className="mb-4">
          检查状态
        </Button>
        <div className="space-y-2">
          {Object.entries(adStatus).map(([key, value]) => (
            <div key={key} className="text-sm">
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showRealAds}
            onChange={(e) => setShowRealAds(e.target.checked)}
            className="rounded"
          />
          <span>显示真实广告（需要配置Slot ID）</span>
        </label>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">自动广告测试</h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">
              当前使用AdSense自动广告，Google会自动在页面最佳位置插入广告。
              如果已启用自动广告并接受Cookie同意，广告将在几分钟内显示。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">手动广告单元（如需要）</h2>
          {showRealAds && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <h3 className="text-lg mb-2">横幅广告</h3>
                <BannerAd />
              </div>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <h3 className="text-lg mb-2">方形广告</h3>
                <SquareAd />
              </div>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded">
                <h3 className="text-lg mb-2">侧边广告</h3>
                <SidebarAd />
              </div>
            </div>
          )}
          {!showRealAds && (
            <p className="text-sm text-gray-600">
              勾选上方复选框来显示手动广告单元（需要配置Slot ID）
            </p>
          )}
        </section>
      </div>

      <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold mb-2">调试提示：</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>打开浏览器开发者工具（F12）</li>
          <li>检查Console标签页是否有AdSense相关日志</li>
          <li>检查Network标签页是否加载了AdSense脚本</li>
          <li>确保已接受Cookie同意</li>
          <li>如果看到空白，可能是：
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>Slot ID未配置</li>
              <li>网站未通过AdSense审核</li>
              <li>使用了广告拦截器</li>
              <li>IP地址被限制（开发环境）</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  )
}