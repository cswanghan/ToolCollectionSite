import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// 加载环境变量
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function initDatabase() {
  try {
    console.log('🔗 Testing Supabase connection...')
    
    // 测试连接
    const { data, error } = await supabase.from('categories').select('count', { count: 'exact' }).limit(1)
    
    if (error && error.code === '42P01') {
      console.log('📊 Database tables not found. Please run the SQL schema in Supabase dashboard.')
      console.log('Go to: https://supabase.com/dashboard/project/iazzehufkcdsfkfyvldj/sql/new')
      console.log('Copy and paste the contents of supabase/schema.sql')
      return
    }
    
    if (error) {
      console.error('❌ Database connection error:', error.message)
      return
    }
    
    console.log('✅ Successfully connected to Supabase!')
    
    // 检查是否有数据
    const { count } = await supabase.from('categories').select('*', { count: 'exact', head: true })
    
    if (count === 0) {
      console.log('📊 Database is empty. The schema SQL includes sample data.')
    } else {
      console.log(`📊 Found ${count} categories in database`)
    }
    
    // 测试工具表
    const { count: toolsCount } = await supabase.from('tools').select('*', { count: 'exact', head: true })
    console.log(`🛠️  Found ${toolsCount || 0} tools in database`)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

initDatabase()