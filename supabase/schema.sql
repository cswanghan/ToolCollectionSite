-- 创建分类表
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 创建工具表
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  icon VARCHAR(50),
  tags TEXT[],
  click_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 创建点击日志表
CREATE TABLE click_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 创建用户收藏表
CREATE TABLE user_favorites (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (user_id, tool_id)
);

-- 创建索引
CREATE INDEX idx_tools_category_id ON tools(category_id);
CREATE INDEX idx_tools_is_active ON tools(is_active);
CREATE INDEX idx_tools_is_featured ON tools(is_featured);
CREATE INDEX idx_click_logs_tool_id ON click_logs(tool_id);
CREATE INDEX idx_click_logs_created_at ON click_logs(created_at);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 插入默认分类数据
INSERT INTO categories (slug, name, icon, order_index) VALUES
('dev', '开发', 'Code', 1),
('text', '文本', 'FileText', 2),
('time', '时间', 'Clock', 3),
('image', '图片', 'Image', 4),
('media', '音视频', 'Video', 5),
('convert', '转换', 'RefreshCw', 6),
('encode', '编码', 'Binary', 7),
('security', '安全', 'Shield', 8),
('network', '网络', 'Globe', 9),
('other', '其他', 'Grid3x3', 10);

-- 插入示例工具数据
INSERT INTO tools (category_id, name, description, url, tags) VALUES
((SELECT id FROM categories WHERE slug = 'dev'), 'JSON Beautifier', 'JSON 格式化、验证和美化工具', 'https://jsonbeautifier.org/', ARRAY['json', 'format', 'beautify']),
((SELECT id FROM categories WHERE slug = 'dev'), 'Regex Tester', '正则表达式测试和调试工具', 'https://regex101.com/', ARRAY['regex', 'test', 'debug']),
((SELECT id FROM categories WHERE slug = 'dev'), 'JWT Decoder', 'JWT Token 解码和验证工具', 'https://jwt.io/', ARRAY['jwt', 'token', 'decode']),
((SELECT id FROM categories WHERE slug = 'text'), 'Diff Checker', '文本差异对比工具', 'https://www.diffchecker.com/', ARRAY['diff', 'compare', 'text']),
((SELECT id FROM categories WHERE slug = 'time'), 'Unix Timestamp', 'Unix 时间戳转换工具', 'https://www.unixtimestamp.com/', ARRAY['timestamp', 'unix', 'time']),
((SELECT id FROM categories WHERE slug = 'image'), 'TinyPNG', '图片压缩工具', 'https://tinypng.com/', ARRAY['image', 'compress', 'png']),
((SELECT id FROM categories WHERE slug = 'encode'), 'Base64 Encode', 'Base64 编码解码工具', 'https://www.base64encode.org/', ARRAY['base64', 'encode', 'decode']),
((SELECT id FROM categories WHERE slug = 'security'), 'MD5 Generator', 'MD5 哈希生成器', 'https://www.md5hashgenerator.com/', ARRAY['md5', 'hash', 'security']);

-- 启用 RLS (行级安全策略)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- 创建策略
-- 所有人都可以查看分类和工具
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Tools are viewable by everyone" ON tools FOR SELECT TO public USING (is_active = true);

-- 所有人都可以创建点击日志
CREATE POLICY "Click logs can be created by everyone" ON click_logs FOR INSERT TO public WITH CHECK (true);

-- 用户只能管理自己的收藏
CREATE POLICY "Users can view own favorites" ON user_favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON user_favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON user_favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);