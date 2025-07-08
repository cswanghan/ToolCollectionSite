import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Star, ArrowLeft } from 'lucide-react'
import { tools, categories } from '@/lib/data/tools'

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = tools.find(t => t.id === id)
  
  if (!tool) {
    notFound()
  }
  
  const category = categories.find(c => c.id === tool.categoryId)
  const relatedTools = tools
    .filter(t => t.categoryId === tool.categoryId && t.id !== tool.id)
    .slice(0, 4)
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 面包屑导航 */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-200">
          首页
        </Link>
        <span>›</span>
        <Link 
          href={`/c/${category?.slug}`} 
          className="hover:text-slate-900 dark:hover:text-slate-200"
        >
          {category?.name}
        </Link>
        <span>›</span>
        <span className="text-slate-900 dark:text-slate-100">{tool.name}</span>
      </nav>
      
      {/* 工具信息 */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">{tool.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            立即使用
          </a>
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold rounded-lg transition-colors">
            <Star className="w-5 h-5" />
            收藏
          </button>
        </div>
      </div>
      
      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            相关工具
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map(relatedTool => (
              <Link
                key={relatedTool.id}
                href={`/t/${relatedTool.id}`}
                className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {relatedTool.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {relatedTool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}