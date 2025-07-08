import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { categories, searchTools } from '@/lib/data/tools'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const results = query ? searchTools(query) : []
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTabs categories={categories} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          搜索结果
          {query && (
            <span className="text-slate-600 dark:text-slate-400 font-normal">
              ："{query}"
            </span>
          )}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          {results.length > 0
            ? `找到 ${results.length} 个相关工具`
            : '没有找到相关工具'}
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            没有找到与 "{query}" 相关的工具
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            试试其他关键词，或浏览分类查找工具
          </p>
        </div>
      )}
    </div>
  )
}