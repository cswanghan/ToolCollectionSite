'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Package, 
  BarChart3, 
  MousePointer, 
  Settings,
  LogOut
} from 'lucide-react'

const menuItems = [
  {
    label: '仪表板',
    href: '/admin',
    icon: Home
  },
  {
    label: '工具管理',
    href: '/admin/tools',
    icon: Package
  },
  {
    label: '分类管理',
    href: '/admin/categories',
    icon: BarChart3
  },
  {
    label: '点击统计',
    href: '/admin/analytics',
    icon: MousePointer
  },
  {
    label: '系统设置',
    href: '/admin/settings',
    icon: Settings
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  
  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          管理后台
        </h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          退出登录
        </button>
      </div>
    </div>
  )
}