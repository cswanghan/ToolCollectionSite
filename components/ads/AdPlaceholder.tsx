'use client'

interface AdPlaceholderProps {
  width?: number
  height?: number
  className?: string
  label?: string
}

export function AdPlaceholder({ 
  width = 728, 
  height = 90, 
  className = '', 
  label = '广告位' 
}: AdPlaceholderProps) {
  return (
    <div 
      className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{width} × {height}</div>
      </div>
    </div>
  )
}

// 预定义的广告占位符
export function BannerAdPlaceholder({ className }: { className?: string }) {
  return (
    <AdPlaceholder 
      width={728} 
      height={90} 
      label="横幅广告"
      className={className}
    />
  )
}

export function SquareAdPlaceholder({ className }: { className?: string }) {
  return (
    <AdPlaceholder 
      width={300} 
      height={250} 
      label="方形广告"
      className={className}
    />
  )
}

export function SidebarAdPlaceholder({ className }: { className?: string }) {
  return (
    <AdPlaceholder 
      width={160} 
      height={600} 
      label="侧边广告"
      className={className}
    />
  )
}