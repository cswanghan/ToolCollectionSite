import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type Tool = Database['public']['Tables']['tools']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export interface ToolWithCategory extends Tool {
  categories: Category | null
}

export async function getTools(options?: {
  categoryId?: string
  featured?: boolean
  search?: string
  sortBy?: 'name' | 'clicks' | 'recent'
  sortOrder?: 'asc' | 'desc'
}) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('tools')
      .select('*, categories(*)')
      .eq('is_active', true)
    
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId)
    }
    
    if (options?.featured) {
      query = query.eq('is_featured', true)
    }
    
    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
    }
    
    // 排序
    if (options?.sortBy === 'clicks') {
      query = query.order('click_count', { ascending: options.sortOrder === 'asc' })
    } else if (options?.sortBy === 'recent') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('name', { ascending: options?.sortOrder === 'asc' })
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching tools:', error)
      return getStaticTools(options)
    }
    
    return data as ToolWithCategory[]
  } catch (error) {
    console.error('Supabase not available, using static data:', error)
    return getStaticTools(options)
  }
}

// 静态数据作为后备
function getStaticTools(options?: {
  categoryId?: string
  featured?: boolean
  search?: string
  sortBy?: 'name' | 'clicks' | 'recent'
  sortOrder?: 'asc' | 'desc'
}): ToolWithCategory[] {
  const staticTools: ToolWithCategory[] = [
    {
      id: '1',
      category_id: '1',
      name: 'JSON Beautifier',
      description: 'JSON 格式化、验证和美化工具',
      url: 'https://jsonbeautifier.org/',
      icon: null,
      tags: ['json', 'format', 'beautify'],
      click_count: 120,
      is_featured: true,
      is_active: true,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
      categories: { id: '1', slug: 'dev', name: '开发', icon: 'Code', order_index: 1, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
    },
    {
      id: '2',
      category_id: '1',
      name: 'Regex Tester',
      description: '正则表达式测试和调试工具',
      url: 'https://regex101.com/',
      icon: null,
      tags: ['regex', 'test', 'debug'],
      click_count: 95,
      is_featured: false,
      is_active: true,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
      categories: { id: '1', slug: 'dev', name: '开发', icon: 'Code', order_index: 1, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
    },
    {
      id: '3',
      category_id: '2',
      name: 'Diff Checker',
      description: '文本差异对比工具',
      url: 'https://www.diffchecker.com/',
      icon: null,
      tags: ['diff', 'compare', 'text'],
      click_count: 78,
      is_featured: false,
      is_active: true,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
      categories: { id: '2', slug: 'text', name: '文本', icon: 'FileText', order_index: 2, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
    },
    {
      id: '4',
      category_id: '4',
      name: 'TinyPNG',
      description: '图片压缩工具',
      url: 'https://tinypng.com/',
      icon: null,
      tags: ['image', 'compress', 'png'],
      click_count: 156,
      is_featured: true,
      is_active: true,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
      categories: { id: '4', slug: 'image', name: '图片', icon: 'Image', order_index: 4, created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
    }
  ]
  
  let filteredTools = staticTools
  
  if (options?.categoryId) {
    filteredTools = filteredTools.filter(tool => tool.category_id === options.categoryId)
  }
  
  if (options?.featured) {
    filteredTools = filteredTools.filter(tool => tool.is_featured)
  }
  
  if (options?.search) {
    const searchLower = options.search.toLowerCase()
    filteredTools = filteredTools.filter(tool => 
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description?.toLowerCase().includes(searchLower) ||
      tool.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  // 排序
  if (options?.sortBy === 'clicks') {
    filteredTools.sort((a, b) => options.sortOrder === 'asc' ? a.click_count - b.click_count : b.click_count - a.click_count)
  } else if (options?.sortBy === 'recent') {
    filteredTools.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else {
    filteredTools.sort((a, b) => options?.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }
  
  return filteredTools
}

export async function getToolById(id: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(*)')
      .eq('id', id)
      .eq('is_active', true)
      .single()
    
    if (error) {
      console.error('Error fetching tool:', error)
      return getStaticTools().find(tool => tool.id === id) || null
    }
    
    return data as ToolWithCategory
  } catch (error) {
    console.error('Supabase not available, using static data:', error)
    return getStaticTools().find(tool => tool.id === id) || null
  }
}

export async function getToolsByCategorySlug(slug: string) {
  try {
    const supabase = createClient()
    
    // 先获取分类
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (!category) {
      // 使用静态数据查找分类
      const staticCategory = getStaticTools().find(tool => tool.categories?.slug === slug)?.categories
      if (!staticCategory) return []
      return getTools({ categoryId: staticCategory.id })
    }
    
    return getTools({ categoryId: category.id })
  } catch (error) {
    console.error('Supabase not available, using static data:', error)
    const staticCategory = getStaticTools().find(tool => tool.categories?.slug === slug)?.categories
    if (!staticCategory) return []
    return getTools({ categoryId: staticCategory.id })
  }
}

export async function trackToolClick(toolId: string) {
  try {
    const response = await fetch(`/api/tools/${toolId}/click`, {
      method: 'POST',
    })
    return response.ok
  } catch (error) {
    console.error('Error tracking click:', error)
    return false
  }
}