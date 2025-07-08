import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type Category = Database['public']['Tables']['categories']['Row']

export async function getCategories() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) {
      console.error('Error fetching categories:', error)
      return getStaticCategories()
    }
    
    return data as Category[]
  } catch (error) {
    console.error('Supabase not available, using static data:', error)
    return getStaticCategories()
  }
}

// 静态数据作为后备
function getStaticCategories(): Category[] {
  return [
    { id: '1', slug: 'dev', name: '开发', icon: 'Code', order_index: 1, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
    { id: '2', slug: 'text', name: '文本', icon: 'FileText', order_index: 2, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
    { id: '3', slug: 'time', name: '时间', icon: 'Clock', order_index: 3, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
    { id: '4', slug: 'image', name: '图片', icon: 'Image', order_index: 4, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
    { id: '5', slug: 'media', name: '音视频', icon: 'Video', order_index: 5, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
  ]
}

export async function getCategoryBySlug(slug: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching category:', error)
      return getStaticCategories().find(c => c.slug === slug) || null
    }
    
    return data as Category
  } catch (error) {
    console.error('Supabase not available, using static data:', error)
    return getStaticCategories().find(c => c.slug === slug) || null
  }
}