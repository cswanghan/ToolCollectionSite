import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ToolsTable } from '@/components/admin/ToolsTable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminToolsPage() {
  const supabase = await createClient()
  
  const { data: tools } = await supabase
    .from('tools')
    .select('*, categories(name, slug)')
    .order('created_at', { ascending: false })
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                工具管理
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                管理所有在线工具
              </p>
            </div>
            <Link href="/admin/tools/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加工具
              </Button>
            </Link>
          </div>
          
          <ToolsTable tools={tools || []} />
        </div>
      </main>
    </div>
  )
}