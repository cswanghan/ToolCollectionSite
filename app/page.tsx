import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { getCategories } from '@/lib/services/categories'
import { getTools } from '@/lib/services/tools'
import { BannerAdPlaceholder } from '@/components/ads/AdPlaceholder'
import * as Icons from 'lucide-react'

export default async function HomePage() {
  const [categories, tools] = await Promise.all([
    getCategories(),
    getTools({ sortBy: 'clicks', sortOrder: 'desc' })
  ])
  
  // 按分类分组工具
  const toolsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = tools
      .filter(tool => tool.category_id === category.id)
      .slice(0, 4) // 每个分类显示前4个热门工具
    return acc
  }, {} as Record<string, typeof tools>)

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTabs categories={categories} />
      
      <div className="space-y-10">
        {categories.map(category => {
          const categoryTools = toolsByCategory[category.id]
          if (categoryTools.length === 0) return null
          
          const IconComponent = (Icons as any)[category.icon || 'Grid3x3'] || Icons.Grid3x3
          
          return (
            <section key={category.id}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <IconComponent className="w-5 h-5 mr-2" />
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
      
      {/* 广告位 */}
      <div className="mt-12 flex justify-center">
        <BannerAdPlaceholder />
      </div>
    </div>
  )
}