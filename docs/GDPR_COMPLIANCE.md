# GDPR合规与Cookie同意管理

## 概述

Google AdSense要求在欧洲经济区(EEA)、英国和瑞士地区实施用户同意管理，以符合GDPR法规。

## 已实现的功能

### 1. Cookie同意横幅 (`components/consent/CookieConsent.tsx`)
- 首次访问时显示
- 提供"接受所有"、"拒绝所有"和"自定义"选项
- 记住用户选择（使用localStorage）
- 支持响应式设计

### 2. Google Consent Mode v2
- 默认拒绝所有同意类型
- 根据用户选择更新同意状态
- 集成到AdSense广告加载流程

### 3. 隐私政策页面 (`app/privacy/page.tsx`)
- 详细说明数据收集和使用
- Cookie使用说明
- 用户权利说明
- 联系方式

## 同意类型说明

- **ad_storage**: 广告相关的Cookie存储
- **analytics_storage**: 分析相关的Cookie存储
- **ad_user_data**: 向Google发送用户数据用于广告目的
- **ad_personalization**: 个性化广告

## 配置步骤

### 1. 更新Google Analytics ID（可选）
如果使用Google Analytics，在`app/layout.tsx`中更新：
```javascript
src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"
```

### 2. 更新联系信息
在`app/privacy/page.tsx`中更新您的联系邮箱：
```javascript
电子邮件：[your-email@example.com]
```

### 3. 测试同意流程
1. 清除浏览器localStorage
2. 访问网站，应该看到Cookie同意横幅
3. 测试不同选项的功能

## 合规检查清单

- [x] Cookie同意横幅实现
- [x] Google Consent Mode集成
- [x] 隐私政策页面
- [x] 同意状态持久化
- [x] 拒绝后不加载广告
- [ ] 定期审查和更新隐私政策
- [ ] 记录用户同意（如需要）

## 最佳实践

1. **透明度**: 清楚说明数据用途
2. **控制权**: 让用户轻松管理偏好
3. **持久性**: 记住用户选择
4. **易访问**: 隐私政策链接易于找到

## 注意事项

- 不同国家/地区可能有不同的法规要求
- 定期检查Google的合规要求更新
- 考虑使用Google认证的CMP（如需更高级功能）

## 参考资源

- [Google AdSense GDPR指南](https://support.google.com/adsense/answer/10961914)
- [Google Consent Mode文档](https://developers.google.com/tag-platform/gtagjs/consent)
- [GDPR官方网站](https://gdpr.eu/)