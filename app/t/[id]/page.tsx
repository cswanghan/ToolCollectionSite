import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Star, ArrowLeft } from 'lucide-react'
import { getToolById, getTools } from '@/lib/services/tools'
import { ToolDetailClient } from './ToolDetailClient'

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = await getToolById(id)
  
  if (!tool) {
    notFound()
  }
  
  const relatedTools = await getTools({
    categoryId: tool.category_id || undefined,
    sortBy: 'clicks',
    sortOrder: 'desc'
  })
  
  const filteredRelatedTools = relatedTools.filter(t => t.id !== tool.id).slice(0, 4)
  
  return (
    <ToolDetailClient 
      tool={tool}
      relatedTools={filteredRelatedTools}
    />
  )
}