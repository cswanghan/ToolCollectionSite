import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 网站信息 */}
          <div>
            <h3 className="font-semibold mb-3">关于 ToolNavi</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              您的在线工具导航站，汇集最实用的网络工具，让工作和生活更高效。
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold mb-3">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  使用指南
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 热门分类 */}
          <div>
            <h3 className="font-semibold mb-3">热门分类</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/c/dev" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  开发工具
                </Link>
              </li>
              <li>
                <Link href="/c/text" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  文本处理
                </Link>
              </li>
              <li>
                <Link href="/c/image" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  图片工具
                </Link>
              </li>
              <li>
                <Link href="/c/life" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                  生活工具
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h3 className="font-semibold mb-3">联系我们</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              如有任何问题或建议，欢迎联系我们：
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              contact@example.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2024 ToolNavi. All rights reserved. | 为用户提供最好的在线工具导航服务
          </p>
        </div>
      </div>
    </footer>
  )
}