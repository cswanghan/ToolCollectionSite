import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { categories, tools } from '@/lib/data/tools'

export default function HomePage() {
  // 按分类分组工具
  const toolsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = tools
      .filter(tool => tool.categoryId === category.id)
      .sort((a, b) => b.clickCount - a.clickCount)
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
          
          return (
            <section key={category.id}>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">{category.icon}</span>
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
      <div className="mt-12">
        <div className="w-full max-w-[970px] h-[90px] mx-auto bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
          [Banner 广告位 970×90]
        </div>
      </div>
    </div>
  )
}