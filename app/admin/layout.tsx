// import { createClient } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 临时禁用认证检查，允许直接访问后台
  // TODO: 实现更安全的认证方式（如密码保护或IP白名单）
  
  // const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) {
  //   redirect('/')
  // }
  
  return <>{children}</>
}