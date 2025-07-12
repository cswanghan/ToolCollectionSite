export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">网站简介</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            在线工具导航是一个专注于收集和整理互联网上优质在线工具的导航网站。我们的目标是帮助用户快速找到所需的工具，
            提高工作效率，让复杂的任务变得简单。
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            自成立以来，我们始终坚持"实用、高效、易用"的原则，精心挑选每一个工具，确保它们能够真正解决用户的实际需求。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">我们的使命</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
            <li>为用户提供最全面、最实用的在线工具集合</li>
            <li>节省用户寻找工具的时间，让工作更高效</li>
            <li>持续发现和推荐新的优质工具</li>
            <li>建立一个可信赖的工具推荐平台</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">工具收录标准</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            我们在收录工具时会严格遵循以下标准：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">✅ 功能实用</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                工具必须能够解决实际问题，功能明确且易于使用
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🔒 安全可靠</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                确保工具来源可靠，不会泄露用户数据或包含恶意代码
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🚀 性能优良</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                工具响应速度快，运行稳定，用户体验良好
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🆓 免费使用</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                优先收录免费或有免费版本的工具，让更多用户受益
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">用户反馈</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            我们非常重视用户的意见和建议。如果您有以下需求，欢迎与我们联系：
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
            <li>推荐新的优质工具</li>
            <li>报告失效的工具链接</li>
            <li>提供功能改进建议</li>
            <li>反馈使用中遇到的问题</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">发展历程</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">2024年 - 网站成立</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                开始收集和整理各类在线工具，建立初步的分类体系
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">持续更新</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                不断发现新工具，优化用户体验，完善功能
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
          <p className="text-slate-600 dark:text-slate-400">
            如果您有任何问题或建议，请通过以下方式联系我们：
          </p>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400">
              邮箱：contact@example.com
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}