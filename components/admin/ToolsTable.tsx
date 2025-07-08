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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash2, Eye, ExternalLink } from 'lucide-react'
import { ToolWithCategory } from '@/lib/services/tools'
import Link from 'next/link'

interface ToolsTableProps {
  tools: ToolWithCategory[]
}

export function ToolsTable({ tools }: ToolsTableProps) {
  const [loading, setLoading] = useState<string | null>(null)
  
  const handleDelete = async (toolId: string) => {
    if (!confirm('确定要删除这个工具吗？')) return
    
    setLoading(toolId)
    try {
      // TODO: 实现删除功能
      console.log('Delete tool:', toolId)
    } catch (error) {
      console.error('Failed to delete tool:', error)
    } finally {
      setLoading(null)
    }
  }
  
  const toggleStatus = async (toolId: string, currentStatus: boolean) => {
    setLoading(toolId)
    try {
      // TODO: 实现状态切换
      console.log('Toggle status:', toolId, !currentStatus)
    } catch (error) {
      console.error('Failed to toggle status:', error)
    } finally {
      setLoading(null)
    }
  }
  
  return (
    <div className="border rounded-lg bg-white dark:bg-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>工具名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>点击量</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                    {tool.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {tool.categories?.name || '未分类'}
                </Badge>
              </TableCell>
              <TableCell>{tool.click_count}</TableCell>
              <TableCell>
                <Badge variant={tool.is_active ? 'default' : 'secondary'}>
                  {tool.is_active ? '已启用' : '已禁用'}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(tool.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      disabled={loading === tool.id}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/t/${tool.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        预览
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={tool.url} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        访问
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/tools/${tool.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        编辑
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => toggleStatus(tool.id, tool.is_active)}
                    >
                      {tool.is_active ? '禁用' : '启用'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(tool.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}