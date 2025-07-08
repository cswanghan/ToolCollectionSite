import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const headersList = await headers()
    
    // 获取请求信息
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '0.0.0.0'
    const userAgent = headersList.get('user-agent') || ''
    const referrer = headersList.get('referer') || ''
    
    // 记录点击日志
    const { error: logError } = await supabase
      .from('click_logs')
      .insert({
        tool_id: id,
        ip_address: ip.split(',')[0].trim(),
        user_agent: userAgent,
        referrer: referrer
      })
    
    if (logError) {
      console.error('Failed to log click:', logError)
    }
    
    // 更新点击计数
    const { error: updateError } = await supabase.rpc('increment', {
      table_name: 'tools',
      column_name: 'click_count',
      row_id: id
    })
    
    if (updateError) {
      // 如果 RPC 函数不存在，使用传统方法
      const { data: tool } = await supabase
        .from('tools')
        .select('click_count')
        .eq('id', id)
        .single()
      
      if (tool) {
        await supabase
          .from('tools')
          .update({ click_count: (tool.click_count || 0) + 1 })
          .eq('id', id)
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}