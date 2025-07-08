import { notFound } from 'next/navigation'
import { CategoryPageClient } from './CategoryPageClient'
import { getCategoryBySlug } from '@/lib/services/categories'
import { getCategories } from '@/lib/services/categories'
import { getToolsByCategorySlug } from '@/lib/services/tools'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const [category, categories, tools] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getToolsByCategorySlug(slug)
  ])
  
  if (!category) {
    notFound()
  }
  
  return (
    <CategoryPageClient 
      category={category}
      categories={categories}
      initialTools={tools}
    />
  )
}