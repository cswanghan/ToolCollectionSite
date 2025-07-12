import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { getCategories } from '@/lib/services/categories'
import { getTools } from '@/lib/services/tools'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  
  const [categories, results] = await Promise.all([
    getCategories(),
    query ? getTools({ search: query }) : Promise.resolve([])
  ])
  
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          
          {/* 搜索技巧 */}
          <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">🔍 搜索技巧</h2>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• 使用工具的关键功能作为搜索词，如：“JSON”、“压缩”、“转换”</li>
              <li>• 支持模糊搜索，输入部分关键词即可</li>
              <li>• 可以搜索工具名称、描述或标签</li>
              <li>• 不区分大小写，更方便查找</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              没有找到与 "{query}" 相关的工具
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
              试试其他关键词，或浏览分类查找工具
            </p>
            
            {/* 推荐搜索词 */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-3">试试这些热门搜索：</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['JSON', '图片压缩', '正则', '时间戳', 'Base64', '二维码'].map(keyword => (
                  <a
                    key={keyword}
                    href={`/search?q=${encodeURIComponent(keyword)}`}
                    className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    {keyword}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}