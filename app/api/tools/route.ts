import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const categoryId = searchParams.get('categoryId')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    
    let query = supabase
      .from('tools')
      .select('*, categories(name, slug)')
      .eq('is_active', true)
    
    // 过滤条件
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`)
    }
    
    // 排序
    if (sortBy === 'clicks') {
      query = query.order('click_count', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'recent') {
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order('name', { ascending: sortOrder === 'asc' })
    }
    
    const { data, error } = await query
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}