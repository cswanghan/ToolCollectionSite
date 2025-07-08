'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryTabsProps {
  categories: Category[]
  currentCategoryId?: string
}

export function CategoryTabs({ categories, currentCategoryId }: CategoryTabsProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className="mb-8 border-b border-slate-200 dark:border-slate-700">
      <div className="flex space-x-6 -mb-px overflow-x-auto">
        <Link
          href="/"
          className={cn(
            "inline-flex items-center py-4 px-1 border-b-2 text-sm font-medium whitespace-nowrap transition-colors",
            isHome && !currentCategoryId
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
          )}
        >
          <span className="mr-2">🏠</span>
          全部
        </Link>
        
        {categories.map((category) => {
          const IconComponent = (Icons as any)[category.icon || 'Grid3x3'] || Icons.Grid3x3
          
          return (
            <Link
              key={category.id}
              href={`/c/${category.slug}`}
              className={cn(
                "inline-flex items-center py-4 px-1 border-b-2 text-sm font-medium whitespace-nowrap transition-colors",
                currentCategoryId === category.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
              )}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}