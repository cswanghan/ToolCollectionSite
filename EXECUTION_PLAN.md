# 在线工具导航站 - 执行计划

*版本*: 1.0  
*日期*: 2025-01-08  
*项目状态*: 原型阶段 → Next.js 迁移待启动

---

## 项目概览

### 当前状态
- ✅ 完整的 HTML/CSS/JS 原型 (demo.html)
- ✅ 详细的产品需求文档 (CLAUDE.md)
- ✅ Git 仓库已初始化
- ✅ Next.js 项目结构已搭建
- ✅ 核心页面已实现（首页、分类页、详情页、搜索页）
- ✅ 静态数据版本运行正常
- ❌ 后端/数据库未配置
- ❌ 用户系统未实现
- ❌ 管理后台未开发

### 技术栈目标
- **前端**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **后端**: Supabase (PostgreSQL + Auth + Edge Functions)
- **部署**: Vercel (SSG/ISR)
- **监控**: Vercel Analytics + Sentry

---

## 执行计划总览

### 阶段划分

| 阶段 | 时间 | 主要任务 | 交付物 |
|-----|------|---------|-------|
| **阶段1: 基础搭建** | Week 1-2 | Next.js 项目初始化、组件迁移 | 可运行的 Next.js 基础框架 |
| **阶段2: 核心功能** | Week 3-4 | 首页、分类页、详情页、搜索 | 静态数据版本的完整前端 |
| **阶段3: 数据层** | Week 5-6 | Supabase 集成、API 开发 | 动态数据、跳转统计 |
| **阶段4: 用户系统** | Week 7-8 | OAuth 登录、收藏同步 | 完整的用户功能 |
| **阶段5: 管理后台** | Week 9-10 | CMS 开发、广告集成 | 管理面板、AdSense |
| **阶段6: 优化上线** | Week 11-12 | SEO、PWA、性能优化、部署 | 生产环境上线 |

---

## 详细执行计划

### 阶段1: 基础搭建 (Week 1-2)

#### Sprint 1.1: 项目初始化
- [x] 创建 Next.js 14 项目 (App Router)
  ```bash
  npx create-next-app@latest tool-collection-site --typescript --tailwind --app
  ```
- [x] 配置项目结构
  ```
  /app
    /layout.tsx          # 根布局
    /page.tsx           # 首页
    /c/[slug]/page.tsx  # 分类页
    /t/[id]/page.tsx    # 详情页
    /search/page.tsx    # 搜索页
    /admin/*            # 管理后台
  /components
    /ui                 # shadcn/ui 组件
    /shared             # 共享组件
  /lib
    /types              # TypeScript 类型
    /utils              # 工具函数
    /data               # 静态数据
  /public              # 静态资源
  ```
- [x] 安装核心依赖
  ```json
  {
    "dependencies": {
      "next": "14.x",
      "react": "^18",
      "tailwindcss": "^3",
      "@radix-ui/react-*": "latest",
      "class-variance-authority": "^0.7",
      "clsx": "^2",
      "lucide-react": "^0.3"
    }
  }
  ```
- [x] 配置 shadcn/ui
  ```bash
  npx shadcn-ui@latest init
  ```

#### Sprint 1.2: 组件迁移
- [x] 从 demo.html 提取并创建 React 组件
  - [x] Layout 组件 (Header, Footer, Navigation)
  - [x] ToolCard 组件
  - [x] CategoryTabs 组件
  - [x] SearchBar 组件
  - [x] ThemeToggle 组件
- [x] 迁移样式到 Tailwind 配置
- [x] 设置暗色模式支持 (next-themes)

### 阶段2: 核心功能 (Week 3-4)

#### Sprint 2.1: 页面开发
- [x] 首页实现
  - [x] 热门工具展示
  - [x] 分类导航
  - [x] 搜索功能
- [x] 分类列表页
  - [x] 动态路由 `/c/[slug]`
  - [ ] 筛选和排序
  - [ ] 网格/列表视图切换
- [x] 工具详情页
  - [x] 动态路由 `/t/[id]`
  - [x] 工具信息展示
  - [x] 相关工具推荐

#### Sprint 2.2: 交互功能
- [x] 搜索功能实现
  - [x] 实时搜索
  - [x] 搜索结果页
- [x] 本地存储功能
  - [x] 收藏功能 (LocalStorage)
  - [x] 最近使用记录
- [x] 页面过渡动画

### 阶段3: 数据层 (Week 5-6)

#### Sprint 3.1: Supabase 配置
- [ ] 创建 Supabase 项目
- [ ] 设计数据库架构
  ```sql
  -- 分类表
  CREATE TABLE categories (
    id UUID PRIMARY KEY,
    slug VARCHAR UNIQUE,
    name VARCHAR,
    icon VARCHAR,
    order_index INT
  );

  -- 工具表
  CREATE TABLE tools (
    id UUID PRIMARY KEY,
    category_id UUID REFERENCES categories,
    name VARCHAR,
    description TEXT,
    url VARCHAR,
    icon_url VARCHAR,
    tags TEXT[],
    click_count INT DEFAULT 0,
    created_at TIMESTAMP
  );

  -- 点击记录表
  CREATE TABLE click_logs (
    id UUID PRIMARY KEY,
    tool_id UUID REFERENCES tools,
    timestamp TIMESTAMP,
    ip_address INET,
    referrer VARCHAR,
    user_agent VARCHAR
  );

  -- 用户收藏表
  CREATE TABLE user_favorites (
    user_id UUID,
    tool_id UUID REFERENCES tools,
    created_at TIMESTAMP,
    PRIMARY KEY (user_id, tool_id)
  );
  ```
- [ ] 创建 Row Level Security 策略
- [ ] 导入初始数据

#### Sprint 3.2: API 开发
- [ ] 创建 API Routes
  - [ ] `/api/tools` - 工具列表
  - [ ] `/api/categories` - 分类列表
  - [ ] `/api/click` - 记录点击
  - [ ] `/api/search` - 搜索接口
- [ ] 实现 Edge Functions
  - [ ] 跳转统计函数
  - [ ] 热度计算函数
- [ ] 数据缓存策略 (ISR)

### 阶段4: 用户系统 (Week 7-8)

#### Sprint 4.1: 认证系统
- [ ] 配置 Supabase Auth
- [ ] 实现 OAuth 登录
  - [ ] Google 登录
  - [ ] GitHub 登录
- [ ] 创建认证组件
  - [ ] 登录按钮
  - [ ] 用户菜单
  - [ ] 认证守卫

#### Sprint 4.2: 用户功能
- [ ] 收藏同步
  - [ ] 本地收藏迁移到云端
  - [ ] 跨设备同步
- [ ] 个人中心页面
  - [ ] 收藏列表
  - [ ] 使用历史
  - [ ] 账号设置

### 阶段5: 管理后台 (Week 9-10)

#### Sprint 5.1: CMS 开发
- [ ] 管理后台布局
- [ ] 工具管理
  - [ ] CRUD 操作
  - [ ] 批量导入/导出
  - [ ] 图片上传
- [ ] 分类管理
- [ ] 数据统计
  - [ ] 点击统计图表
  - [ ] 热门工具排行

#### Sprint 5.2: 广告系统
- [ ] AdSense 集成
  - [ ] 广告位组件
  - [ ] 响应式广告
- [ ] 广告位管理
- [ ] A/B 测试框架

### 阶段6: 优化上线 (Week 11-12)

#### Sprint 6.1: 性能优化
- [ ] SEO 优化
  - [ ] Meta tags
  - [ ] Sitemap 生成
  - [ ] 结构化数据
- [ ] PWA 实现
  - [ ] Service Worker
  - [ ] 离线缓存
  - [ ] 安装提示
- [ ] 性能优化
  - [ ] 图片优化 (next/image)
  - [ ] 代码分割
  - [ ] 预加载策略

#### Sprint 6.2: 部署上线
- [ ] Vercel 部署配置
- [ ] 环境变量设置
- [ ] 监控集成
  - [ ] Vercel Analytics
  - [ ] Sentry 错误追踪
- [ ] CI/CD 配置
- [ ] 域名配置
- [ ] SSL 证书

---

## 关键里程碑

| 日期 | 里程碑 | 验收标准 |
|-----|--------|---------|
| Week 2 末 | 基础框架完成 | Next.js 项目可运行，核心组件迁移完成 |
| Week 4 末 | 静态版本完成 | 所有页面可访问，使用静态数据 |
| Week 6 末 | 动态数据接入 | Supabase 集成，真实数据展示 |
| Week 8 末 | 用户系统上线 | OAuth 登录，收藏同步功能 |
| Week 10 末 | 后台管理完成 | CMS 可用，广告系统接入 |
| Week 12 末 | 正式上线 | 生产环境部署，监控系统就绪 |

---

## 风险管理

### 技术风险
1. **Next.js App Router 学习曲线**
   - 缓解: 提前学习文档，参考最佳实践
   
2. **Supabase 限额**
   - 缓解: 优化查询，使用缓存，必要时升级套餐

3. **SEO 优化挑战**
   - 缓解: 使用 SSG/ISR，确保内容可被爬虫索引

### 运营风险
1. **工具链接失效**
   - 缓解: 实现自动链接检查系统
   
2. **广告政策合规**
   - 缓解: 严格遵守 AdSense 政策，避免误导性内容

---

## 资源需求

### 人力资源
- 前端开发: 1人 (全职)
- UI/UX 设计: 0.5人 (兼职)
- 测试: 0.5人 (兼职)

### 技术资源
- Vercel Pro 账号
- Supabase Pro 账号
- 域名和 SSL 证书
- Cloudflare CDN (可选)

### 预算估算
- 开发成本: 12周 × 开发人员成本
- 运营成本: ~$50/月 (Vercel + Supabase)
- 营销预算: 待定

---

## 成功标准

1. **技术指标**
   - Lighthouse 分数 > 90
   - FCP < 1秒
   - 可用性 > 99.9%

2. **业务指标**
   - D30: 日PV ≥ 5k
   - D90: 日PV ≥ 20k
   - 外链CTR ≥ 35%

3. **用户体验**
   - 搜索响应 < 200ms
   - 页面加载 < 2秒
   - 移动端体验流畅

---

## 下一步行动

1. **立即执行**
   - [ ] 创建 Next.js 项目
   - [ ] 设置开发环境
   - [ ] 开始组件迁移

2. **本周目标**
   - [ ] 完成项目框架搭建
   - [ ] 迁移核心组件
   - [ ] 实现首页静态版本

3. **协调事项**
   - [ ] 确认设计资源
   - [ ] 申请必要账号
   - [ ] 制定详细排期

---

*本执行计划将根据实际进展动态调整*