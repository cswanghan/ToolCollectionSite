# 🚀 项目设置指南

## 1. 数据库初始化

### 步骤 1: 打开 Supabase SQL 编辑器
访问: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new

### 步骤 2: 执行数据库模式
复制 `supabase/schema.sql` 文件的全部内容，粘贴到 SQL 编辑器中并执行。

这将创建以下表：
- `categories` - 工具分类
- `tools` - 工具信息
- `click_logs` - 点击统计
- `user_favorites` - 用户收藏

同时会插入示例数据。

### 步骤 3: 验证安装
运行测试脚本：
```bash
node scripts/init-db.js
```

## 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 3. 配置 OAuth (可选)

### GitHub OAuth
1. 在 Supabase Dashboard 中进入 Authentication > Settings
2. 启用 GitHub provider
3. 添加以下配置：
   - Client ID: (从 GitHub OAuth App 获取)
   - Client Secret: (从 GitHub OAuth App 获取)
   - Redirect URL: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

### Google OAuth
1. 启用 Google provider
2. 添加相应的 Client ID 和 Secret

## 4. 部署到 Vercel

### 步骤 1: 连接仓库
在 Vercel 中导入 GitHub 仓库

### 步骤 2: 配置环境变量
在 Vercel 项目设置中添加：
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 步骤 3: 部署
Vercel 会自动构建和部署

## 5. 管理后台

访问 `/admin` 可以管理工具和分类（需要先登录）。

## 6. 功能验证清单

- [ ] 首页显示工具分类
- [ ] 分类页面筛选排序正常
- [ ] 工具详情页显示完整信息
- [ ] 搜索功能正常
- [ ] 点击统计正常记录
- [ ] 收藏功能正常
- [ ] OAuth 登录正常
- [ ] 管理后台可访问
- [ ] 暗黑模式切换正常
- [ ] 响应式设计正常

## 🎯 下一步优化建议

1. **内容丰富化**
   - 添加更多工具分类和工具
   - 完善工具描述和标签

2. **功能增强**
   - 实现管理后台的完整 CRUD 操作
   - 添加工具推荐算法
   - 实现工具评分系统

3. **性能优化**
   - 添加图片 CDN
   - 实现缓存策略
   - 优化数据库查询

4. **SEO 优化**
   - 添加 meta 标签
   - 实现 sitemap
   - 优化页面标题和描述

5. **分析统计**
   - 集成 Google Analytics
   - 添加用户行为分析
   - 实现 A/B 测试