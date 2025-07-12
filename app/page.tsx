import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { getCategories } from '@/lib/services/categories'
import { getTools } from '@/lib/services/tools'
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
  
  // 获取热门工具
  const popularTools = tools.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 网站介绍 */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          在线工具导航 - 您的效率助手
        </h1>
        <p className="text-lg text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          汇集互联网上最实用的在线工具，涵盖开发、设计、文本处理、多媒体等多个领域。
          无需安装任何软件，打开浏览器即可使用，让工作更高效，生活更便捷。
        </p>
      </section>
      
      {/* 热门工具推荐 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">🔥 热门工具推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {popularTools.map(tool => (
            <div key={tool.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{tool.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">👁 {tool.click_count.toLocaleString()} 次使用</span>
                <a href={`/t/${tool.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  查看详情 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
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
      
      {/* 网站特色 */}
      <section className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">为什么选择我们？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">快速访问</h3>
            <p className="text-slate-600 dark:text-slate-400">
              优化的页面加载速度，一键直达目标工具
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold mb-2">安全可靠</h3>
            <p className="text-slate-600 dark:text-slate-400">
              精选高质量工具，确保您的数据安全
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-lg font-semibold mb-2">持续更新</h3>
            <p className="text-slate-600 dark:text-slate-400">
              定期添加新工具，紧跟技术趋势
            </p>
          </div>
        </div>
      </section>
      
      {/* 使用统计 */}
      <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{tools.length}+</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">精选工具</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{categories.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">工具分类</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">
              {tools.reduce((sum, tool) => sum + tool.click_count, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">总使用次数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">随时可用</div>
          </div>
        </div>
      </section>
    </div>
  )
}