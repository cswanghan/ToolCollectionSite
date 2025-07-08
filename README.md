# 在线工具导航站 - ToolNavi

> 一个极简、无干扰的在线工具导航站，帮助开发者和用户快速找到所需的在线工具。

## 🚀 功能特性

- **🔍 智能搜索** - 支持工具名称、描述、标签的全文搜索
- **📱 响应式设计** - 完美适配桌面端和移动端
- **🌙 暗黑模式** - 支持明暗主题切换
- **⭐ 收藏功能** - 本地存储用户收藏的工具
- **📊 点击统计** - 实时统计工具使用量
- **🔐 OAuth 登录** - 支持 GitHub/Google 登录
- **🛠️ 管理后台** - 完整的 CMS 管理系统
- **📈 分类排序** - 支持按热度、名称、时间排序
- **🎨 现代 UI** - 基于 Tailwind CSS 和 shadcn/ui

## 🏗️ 技术栈

- **前端**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI组件**: shadcn/ui, Radix UI, Lucide Icons
- **后端**: Supabase (PostgreSQL + Auth + Edge Functions)
- **部署**: Vercel
- **状态管理**: React Hooks + localStorage

## 📦 安装和运行

### 1. 克隆项目

```bash
git clone <repository-url>
cd ToolCollectionSite
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置环境变量

复制 `.env.example` 到 `.env.local` 并填入相关配置:

```bash
cp .env.example .env.local
```

需要配置的环境变量：
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase 匿名访问密钥
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase 服务角色密钥（可选）

### 4. 设置 Supabase 数据库

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL 编辑器中执行 `supabase/schema.sql` 文件中的 SQL 语句
3. 在 Authentication 设置中启用 GitHub 和 Google 登录（可选）

### 5. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 6. 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
├── app/                    # Next.js 应用路由
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 路由
│   ├── auth/              # 认证相关路由
│   ├── c/[slug]/          # 分类页面
│   ├── t/[id]/            # 工具详情页
│   └── search/            # 搜索页面
├── components/            # React 组件
│   ├── admin/             # 管理后台组件
│   ├── auth/              # 认证组件
│   ├── shared/            # 共享组件
│   └── ui/                # UI 组件库
├── lib/                   # 工具库
│   ├── hooks/             # 自定义 Hooks
│   ├── services/          # 数据服务
│   ├── supabase/          # Supabase 配置
│   └── utils.ts           # 工具函数
├── supabase/              # 数据库模式
└── middleware.ts          # Next.js 中间件
```

## 🎯 核心功能

### 前端功能
- ✅ 首页工具展示
- ✅ 分类页面和筛选
- ✅ 工具详情页
- ✅ 搜索功能
- ✅ 收藏和最近使用
- ✅ 暗黑模式
- ✅ 响应式设计

### 后端功能
- ✅ RESTful API
- ✅ 数据库设计
- ✅ 点击统计
- ✅ OAuth 认证
- ✅ 行级安全策略

### 管理功能
- ✅ 管理后台界面
- ✅ 工具管理
- ✅ 分类管理
- ✅ 数据统计
- ⏳ 完整的 CRUD 操作

## 📝 使用说明

### 普通用户
1. 浏览和搜索工具
2. 点击工具卡片查看详情
3. 点击"立即使用"跳转到工具网站
4. 收藏常用工具（本地存储）
5. 登录后可跨设备同步收藏

### 管理员
1. 访问 `/admin` 进入管理后台
2. 管理工具和分类
3. 查看使用统计
4. 配置系统设置

## 🚀 部署

### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 环境变量配置
在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🛠️ 开发指南

### 添加新工具
1. 登录管理后台
2. 进入工具管理页面
3. 点击"添加工具"
4. 填写工具信息并保存

### 添加新分类
1. 进入分类管理页面
2. 点击"添加分类"
3. 设置分类名称、图标和排序

### 自定义主题
修改 `tailwind.config.js` 中的主题配置。

## 📊 数据库设计

### 主要表结构
- `categories` - 工具分类
- `tools` - 工具信息
- `click_logs` - 点击记录
- `user_favorites` - 用户收藏

详细结构请参考 `supabase/schema.sql`。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详情请参考 [LICENSE](LICENSE) 文件。

## 📞 联系方式

如有问题或建议，请通过 GitHub Issues 联系。

---

**注意**: 项目仍在持续开发中，欢迎反馈和贡献！