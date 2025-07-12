import { getTools } from '@/lib/services/tools'
import { getCategories } from '@/lib/services/categories'
import { ToolCard } from '@/components/shared/ToolCard'

export default async function RecommendPage() {
  const [tools, categories] = await Promise.all([
    getTools({ sortBy: 'clicks', sortOrder: 'desc' }),
    getCategories()
  ])
  
  // 获取各分类的热门工具
  const recommendedByCategory = categories.map(category => ({
    category,
    tools: tools
      .filter(tool => tool.category_id === category.id)
      .slice(0, 3)
  })).filter(item => item.tools.length > 0)
  
  // 获取最新添加的工具
  const latestTools = [...tools]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">工具推荐</h1>
      
      {/* 编辑推荐 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">✨ 编辑推荐</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          我们精心挑选的优质工具，帮助您快速解决各类问题
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">JSON Beautifier</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              开发者必备工具，快速格式化和验证JSON数据，支持语法高亮和错误提示
            </p>
            <a href="/t/1" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              立即使用 →
            </a>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Image Compressor</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              智能图片压缩工具，在保持画质的同时大幅减小文件大小，提升网站性能
            </p>
            <a href="/t/12" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
              立即使用 →
            </a>
          </div>
        </div>
      </section>
      
      {/* 各分类推荐 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">🎯 分类精选</h2>
        {recommendedByCategory.map(({ category, tools }) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="mr-2">{category.icon}</span>
              {category.name}精选
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        ))}
      </section>
      
      {/* 最新工具 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🆕 最新添加</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          最近加入的优质工具，持续为您发现更多实用资源
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
      
      {/* 使用场景推荐 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">💡 使用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">前端开发场景</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              处理API响应、调试代码、优化资源
            </p>
            <div className="space-y-2">
              <a href="/t/1" className="block text-sm hover:text-blue-600">• JSON Beautifier - 格式化API数据</a>
              <a href="/t/14" className="block text-sm hover:text-blue-600">• Color Picker - 选择界面配色</a>
              <a href="/t/12" className="block text-sm hover:text-blue-600">• Image Compressor - 优化图片资源</a>
            </div>
          </div>
          
          <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">内容创作场景</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              撰写文档、处理多媒体、提升效率
            </p>
            <div className="space-y-2">
              <a href="/t/7" className="block text-sm hover:text-blue-600">• Markdown Editor - 撰写技术文档</a>
              <a href="/t/9" className="block text-sm hover:text-blue-600">• Word Counter - 控制文章长度</a>
              <a href="/t/15" className="block text-sm hover:text-blue-600">• YouTube Downloader - 保存视频素材</a>
            </div>
          </div>
          
          <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">数据处理场景</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              转换格式、加密解密、数据分析
            </p>
            <div className="space-y-2">
              <a href="/t/5" className="block text-sm hover:text-blue-600">• Base64 编解码 - 数据传输处理</a>
              <a href="/t/10" className="block text-sm hover:text-blue-600">• Timestamp Converter - 时间数据转换</a>
              <a href="/t/18" className="block text-sm hover:text-blue-600">• Unit Converter - 单位换算</a>
            </div>
          </div>
          
          <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">日常办公场景</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              提高效率、简化流程、节省时间
            </p>
            <div className="space-y-2">
              <a href="/t/13" className="block text-sm hover:text-blue-600">• QR Code Generator - 生成二维码</a>
              <a href="/t/17" className="block text-sm hover:text-blue-600">• Calculator - 科学计算</a>
              <a href="/t/11" className="block text-sm hover:text-blue-600">• World Clock - 跨时区协作</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* 工具组合推荐 */}
      <section className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 工具组合推荐</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          以下工具组合使用，效果更佳：
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛠️</span>
            <div>
              <p className="font-medium">API开发套装</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                JSON Beautifier + JWT Decoder + Base64 编解码
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium">图片处理套装</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Image Compressor + Color Picker + QR Code Generator
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-medium">文本编辑套装</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Markdown Editor + Text Formatter + Word Counter
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}