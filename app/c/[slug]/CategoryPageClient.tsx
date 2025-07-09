'use client'

import { useState, useEffect } from 'react'
import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LayoutGrid, List, ArrowUpDown, Clock, MousePointer } from 'lucide-react'
import { Database } from '@/lib/supabase/types'
import { getTools, ToolWithCategory } from '@/lib/services/tools'
import { SquareAdPlaceholder } from '@/components/ads/AdPlaceholder'
import * as Icons from 'lucide-react'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryPageClientProps {
  category: Category
  categories: Category[]
  initialTools: ToolWithCategory[]
}

export function CategoryPageClient({ category, categories, initialTools }: CategoryPageClientProps) {
  const [tools, setTools] = useState(initialTools)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'clicks' | 'recent'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // 获取图标组件
  const IconComponent = (Icons as any)[category.icon || 'Grid3x3'] || Icons.Grid3x3
  
  useEffect(() => {
    async function fetchSortedTools() {
      setLoading(true)
      try {
        const sortedTools = await getTools({
          categoryId: category.id,
          sortBy,
          sortOrder
        })
        setTools(sortedTools)
      } catch (error) {
        console.error('Failed to fetch tools:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSortedTools()
  }, [category.id, sortBy, sortOrder])
  
  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as ['name' | 'clicks' | 'recent', 'asc' | 'desc']
    setSortBy(newSortBy)
    setSortOrder(newSortOrder || 'desc')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTabs categories={categories} currentCategoryId={category.id} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <IconComponent className="w-6 h-6 mr-2" />
          {category.name}工具
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          共 {tools.length} 个工具
        </p>
      </div>
      
      {/* 工具栏 */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">
                <div className="flex items-center">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  按名称排序
                </div>
              </SelectItem>
              <SelectItem value="clicks-desc">
                <div className="flex items-center">
                  <MousePointer className="w-4 h-4 mr-2" />
                  按热度排序
                </div>
              </SelectItem>
              <SelectItem value="recent-desc">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  最新添加
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} viewMode="list" />
          ))}
        </div>
      )}
      
      {/* 广告位 */}
      <div className="mt-12 flex justify-center">
        <SquareAdPlaceholder />
      </div>
    </div>
  )
}