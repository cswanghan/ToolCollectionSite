'use client'

import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash2, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import { Database } from '@/lib/supabase/types'
import Link from 'next/link'
import * as Icons from 'lucide-react'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoriesTableProps {
  categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [loading, setLoading] = useState<string | null>(null)
  
  const handleDelete = async (categoryId: string) => {
    if (!confirm('确定要删除这个分类吗？删除后该分类下的所有工具也将被删除。')) return
    
    setLoading(categoryId)
    try {
      // TODO: 实现删除功能
      console.log('Delete category:', categoryId)
    } catch (error) {
      console.error('Failed to delete category:', error)
    } finally {
      setLoading(null)
    }
  }
  
  const moveCategory = async (categoryId: string, direction: 'up' | 'down') => {
    setLoading(categoryId)
    try {
      // TODO: 实现排序功能
      console.log('Move category:', categoryId, direction)
    } catch (error) {
      console.error('Failed to move category:', error)
    } finally {
      setLoading(null)
    }
  }
  
  return (
    <div className="border rounded-lg bg-white dark:bg-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>图标</TableHead>
            <TableHead>分类名称</TableHead>
            <TableHead>标识符</TableHead>
            <TableHead>排序</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => {
            const IconComponent = (Icons as any)[category.icon || 'Grid3x3'] || Icons.Grid3x3
            
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{category.name}</div>
                </TableCell>
                <TableCell>
                  <code className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-sm">
                    {category.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">
                      {category.order_index}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveCategory(category.id, 'up')}
                        disabled={index === 0 || loading === category.id}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveCategory(category.id, 'down')}
                        disabled={index === categories.length - 1 || loading === category.id}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(category.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        disabled={loading === category.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/c/${category.slug}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          预览
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/categories/${category.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}