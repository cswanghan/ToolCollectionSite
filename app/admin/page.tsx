import Link from 'next/link'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { BarChart3, MousePointer, Package, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // 获取统计数据
  const [toolsCount, categoriesCount, clicksCount] = await Promise.all([
    supabase.from('tools').select('id', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('click_logs').select('id', { count: 'exact' })
  ])
  
  const stats = [
    {
      title: '工具总数',
      value: toolsCount.count || 0,
      description: '已收录的工具数量',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: '分类数量',
      value: categoriesCount.count || 0,
      description: '工具分类数量',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: '总点击量',
      value: clicksCount.count || 0,
      description: '所有工具的点击次数',
      icon: MousePointer,
      color: 'text-purple-600'
    },
    {
      title: '注册用户',
      value: '-',
      description: '暂未统计',
      icon: Users,
      color: 'text-orange-600'
    }
  ]
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              管理后台
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              管理工具、分类和查看统计数据
            </p>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
              <CardDescription>常用管理功能入口</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/tools/new"
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  <h3 className="font-semibold mb-1">添加新工具</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    向系统中添加新的在线工具
                  </p>
                </Link>
                <Link
                  href="/admin/tools"
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  <h3 className="font-semibold mb-1">管理工具</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    查看和编辑所有工具信息
                  </p>
                </Link>
                <Link
                  href="/admin/categories"
                  className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  <h3 className="font-semibold mb-1">管理分类</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    管理工具分类和排序
                  </p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}