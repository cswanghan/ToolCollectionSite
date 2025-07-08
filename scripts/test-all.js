import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAllFunctions() {
  console.log('🧪 Testing all functionality...\n')
  
  try {
    // 1. 测试分类
    console.log('1️⃣ Testing categories...')
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (catError) {
      console.error('❌ Categories test failed:', catError.message)
      return
    }
    
    console.log(`✅ Found ${categories.length} categories`)
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`))
    
    // 2. 测试工具
    console.log('\n2️⃣ Testing tools...')
    const { data: tools, error: toolError } = await supabase
      .from('tools')
      .select('*, categories(*)')
      .eq('is_active', true)
      .order('name')
    
    if (toolError) {
      console.error('❌ Tools test failed:', toolError.message)
      return
    }
    
    console.log(`✅ Found ${tools.length} tools`)
    tools.forEach(tool => console.log(`   - ${tool.name} (${tool.categories?.name})`))
    
    // 3. 测试分类查询
    console.log('\n3️⃣ Testing category filtering...')
    const devCategory = categories.find(c => c.slug === 'dev')
    if (devCategory) {
      const { data: devTools, error: devError } = await supabase
        .from('tools')
        .select('name')
        .eq('category_id', devCategory.id)
        .eq('is_active', true)
      
      if (devError) {
        console.error('❌ Dev tools test failed:', devError.message)
        return
      }
      
      console.log(`✅ Found ${devTools.length} dev tools`)
      devTools.forEach(tool => console.log(`   - ${tool.name}`))
    }
    
    // 4. 测试搜索
    console.log('\n4️⃣ Testing search...')
    const { data: searchResults, error: searchError } = await supabase
      .from('tools')
      .select('name, description')
      .or('name.ilike.%json%,description.ilike.%json%')
      .eq('is_active', true)
    
    if (searchError) {
      console.error('❌ Search test failed:', searchError.message)
      return
    }
    
    console.log(`✅ Found ${searchResults.length} results for "json"`)
    searchResults.forEach(tool => console.log(`   - ${tool.name}`))
    
    // 5. 测试点击记录
    console.log('\n5️⃣ Testing click logging...')
    const testTool = tools[0]
    if (testTool) {
      const { error: clickError } = await supabase
        .from('click_logs')
        .insert({
          tool_id: testTool.id,
          ip_address: '127.0.0.1',
          user_agent: 'test-script',
          referrer: 'script-test'
        })
      
      if (clickError) {
        console.error('❌ Click logging test failed:', clickError.message)
        return
      }
      
      console.log(`✅ Successfully logged click for ${testTool.name}`)
    }
    
    // 6. 测试点击统计
    console.log('\n6️⃣ Testing click statistics...')
    const { count: clickCount, error: countError } = await supabase
      .from('click_logs')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('❌ Click count test failed:', countError.message)
      return
    }
    
    console.log(`✅ Total clicks recorded: ${clickCount}`)
    
    console.log('\n🎉 All tests passed! The database is working correctly.')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testAllFunctions()