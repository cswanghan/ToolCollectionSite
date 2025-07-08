import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { CategoriesTable } from '@/components/admin/CategoriesTable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminCategoriesPage() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                分类管理
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                管理工具分类和排序
              </p>
            </div>
            <Link href="/admin/categories/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加分类
              </Button>
            </Link>
          </div>
          
          <CategoriesTable categories={categories || []} />
        </div>
      </main>
    </div>
  )
}