# Google AdSense 广告配置指南

## 概述
已完成广告位组件开发，现在需要配置Google AdSense来实现变现。

## 已实现的广告位类型

### 1. 广告组件 (`components/ads/AdSense.tsx`)
- **BannerAd**: 横幅广告 (728×90)
- **SquareAd**: 方形广告 (300×250)  
- **SidebarAd**: 侧边广告 (160×600)

### 2. 广告占位符 (`components/ads/AdPlaceholder.tsx`)
- 开发阶段使用，显示广告位大小和位置
- 生产环境替换为真实AdSense代码

## 广告位部署位置

### 首页 (`app/page.tsx`)
- **横幅广告**: 页面底部，所有分类工具展示后

### 分类页 (`app/c/[slug]/CategoryPageClient.tsx`)
- **方形广告**: 工具列表底部

## 配置步骤

### 1. 申请Google AdSense账号
1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 提交网站审核申请
3. 等待审核通过

### 2. 获取AdSense代码
1. 在AdSense后台创建广告单元
2. 获取Publisher ID (格式: `ca-pub-xxxxxxxxx`)
3. 获取各广告位的Slot ID

### 3. 更新代码配置
修改 `components/ads/AdSense.tsx` 中的以下配置：

```typescript
// 替换YOUR_PUBLISHER_ID
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"

// 替换各广告位的Slot ID
export function BannerAd() {
  return (
    <AdSense slot="YOUR_BANNER_SLOT_ID" />
  )
}

export function SquareAd() {
  return (
    <AdSense slot="YOUR_SQUARE_SLOT_ID" />
  )
}
```

### 4. 环境变量配置
添加到 `.env.local`:
```
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxx
NEXT_PUBLIC_ADSENSE_BANNER_SLOT=xxxxxxxxx
NEXT_PUBLIC_ADSENSE_SQUARE_SLOT=xxxxxxxxx
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=xxxxxxxxx
```

### 5. 替换占位符
生产环境中将 `AdPlaceholder` 组件替换为对应的 `AdSense` 组件：

```typescript
// 开发环境
import { BannerAdPlaceholder } from '@/components/ads/AdPlaceholder'

// 生产环境
import { BannerAd } from '@/components/ads/AdSense'
```

## 广告策略建议

### 1. 广告位置优化
- **首页**: 在用户浏览完所有工具后展示广告
- **分类页**: 工具列表底部，用户决策后的自然位置
- **工具详情页**: 可在"立即使用"按钮附近添加相关工具推荐广告

### 2. 用户体验平衡
- 避免过度广告影响用户体验
- 确保广告不遮挡核心功能
- 移动端适配响应式广告

### 3. 收益优化
- 定期分析广告点击率和eCPM
- 测试不同广告位置的效果
- 根据用户行为调整广告策略

## 部署检查清单

- [ ] Google AdSense账号申请并通过审核
- [ ] 获取Publisher ID和Slot ID
- [ ] 更新AdSense组件配置
- [ ] 添加环境变量
- [ ] 替换占位符为真实广告
- [ ] 测试广告显示效果
- [ ] 验证广告点击统计

## 预期收益

根据PRD目标：
- **D30**: eCPM ≥ $5
- **D90**: eCPM ≥ $8
- **外链CTR**: 35%-45%

通过合理的广告位布局和优质内容，预期能够实现可观的广告收益。