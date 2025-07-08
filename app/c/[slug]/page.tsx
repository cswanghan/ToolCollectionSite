import { notFound } from 'next/navigation'
import { CategoryTabs } from '@/components/shared/CategoryTabs'
import { ToolCard } from '@/components/shared/ToolCard'
import { categories, getToolsByCategory } from '@/lib/data/tools'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = categories.find(c => c.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const tools = getToolsByCategory(category.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryTabs categories={categories} currentCategoryId={category.id} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="mr-2">{category.icon}</span>
          {category.name}工具
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          共 {tools.length} 个工具
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}