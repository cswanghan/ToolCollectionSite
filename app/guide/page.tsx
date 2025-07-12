export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">使用指南</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">快速开始</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            欢迎使用在线工具导航！我们为您提供了简单直观的使用方式，让您能够快速找到并使用所需的工具。
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">浏览分类</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  在首页顶部的分类标签中选择您需要的工具类型，如"开发"、"文本"、"图片"等
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">选择工具</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  点击工具卡片查看详细信息，了解工具的功能特性和使用场景
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">立即使用</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  点击"立即使用"按钮，即可跳转到工具网站开始使用
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">核心功能</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🔍 搜索功能</h3>
              <p className="text-slate-600 dark:text-slate-400">
                使用顶部搜索框可以快速查找工具。支持按工具名称、描述和标签进行搜索。
              </p>
              <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  提示：搜索"JSON"可以找到所有JSON相关的工具
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">⭐ 收藏功能</h3>
              <p className="text-slate-600 dark:text-slate-400">
                点击工具详情页的收藏按钮，可以将常用工具添加到收藏夹。收藏的工具会保存在本地，方便下次快速访问。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">📊 排序选项</h3>
              <p className="text-slate-600 dark:text-slate-400">
                在分类页面，您可以按照以下方式对工具进行排序：
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li>按名称排序：字母顺序排列</li>
                <li>按热度排序：根据使用次数排序</li>
                <li>最新添加：查看最近加入的工具</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">🌓 深色模式</h3>
              <p className="text-slate-600 dark:text-slate-400">
                点击右上角的主题切换按钮，可以在浅色和深色模式之间切换，保护您的眼睛。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">使用技巧</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2">💡 快速访问</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                将本站添加到浏览器书签，或设置为浏览器主页，方便随时访问
              </p>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2">🔄 查看最近使用</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                系统会自动记录您最近使用的工具，方便再次访问
              </p>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2">📱 移动端适配</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                网站完全适配移动设备，手机和平板也能获得良好体验
              </p>
            </div>
            
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2">🎯 精准查找</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                使用标签筛选功能，可以更精确地找到符合需求的工具
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">常见问题</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Q: 工具是否都是免费的？</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A: 我们优先收录免费工具或提供免费版本的工具。部分工具可能有付费高级功能，具体请查看工具官网说明。
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Q: 发现工具链接失效怎么办？</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A: 请通过"关于我们"页面的联系方式告知我们，我们会尽快修复或更新链接。
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Q: 可以推荐新工具吗？</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A: 当然可以！我们欢迎用户推荐优质的在线工具，请通过邮件联系我们。
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Q: 收藏的工具会同步吗？</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A: 目前收藏功能基于浏览器本地存储，不同设备间不会同步。未来我们会考虑添加账号同步功能。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">安全提示</h2>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-amber-800 dark:text-amber-200">
              ⚠️ 使用在线工具时，请注意以下安全事项：
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-amber-700 dark:text-amber-300">
              <li>不要在不信任的工具中输入敏感信息（如密码、信用卡号等）</li>
              <li>使用文件处理工具时，建议先备份重要文件</li>
              <li>注意工具的隐私政策，了解数据如何被处理</li>
              <li>如果工具要求过多权限，请谨慎使用</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}