'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewToolPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

  // 获取分类列表
  useState(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      url: formData.get('url'),
      category_id: formData.get('category_id'),
      tags: formData.get('tags')?.toString().split(',').map(tag => tag.trim()).filter(Boolean) || [],
      is_featured: formData.get('is_featured') === 'on'
    }

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        throw new Error('Failed to create tool')
      }

      router.push('/admin/tools')
    } catch (error) {
      console.error('Error creating tool:', error)
      alert('创建工具失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          <div className="mb-8">
            <Link href="/admin/tools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回工具列表
              </Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">添加新工具</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                工具名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                placeholder="例如：JSON Beautifier"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                工具描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                placeholder="简要描述工具的功能和用途"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                工具URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="url"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                placeholder="https://example.com/tool"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                所属分类 <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="">请选择分类</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                标签
              </label>
              <input
                type="text"
                name="tags"
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
                placeholder="用逗号分隔，例如：json,format,beautify"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  className="rounded"
                />
                <span className="text-sm font-medium">设为推荐工具</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading}>
                {loading ? '创建中...' : '创建工具'}
              </Button>
              <Link href="/admin/tools">
                <Button type="button" variant="outline">
                  取消
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}