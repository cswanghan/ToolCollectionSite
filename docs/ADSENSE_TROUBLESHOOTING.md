# AdSense 广告不显示故障排除

## 问题：已通过审核但看不到广告

### 解决方案 1: 启用自动广告（推荐）

我已经为您添加了自动广告功能，这是最简单的方式：

1. **自动广告的优势**：
   - 无需手动创建广告单元
   - Google自动在最佳位置显示广告
   - 自动优化广告大小和格式

2. **检查自动广告是否启用**：
   - 登录 [Google AdSense](https://www.google.com/adsense/)
   - 左侧菜单选择 **"广告" → "按网站"**
   - 找到您的网站，确保自动广告开关是 **"开启"** 状态

### 解决方案 2: 手动创建广告单元

如果偏好手动控制，需要创建广告单元：

1. **创建广告单元**：
   - AdSense后台 → **"广告" → "按广告单元"**
   - 点击 **"创建广告单元"**
   - 选择 **"展示广告"**

2. **获取Slot ID**：
   创建后获得代码类似：
   ```html
   <ins class="adsbygoogle"
        data-ad-client="ca-pub-4876317440241925"
        data-ad-slot="1234567890"></ins>
   ```
   其中 `1234567890` 就是Slot ID

3. **更新环境变量**：
   ```bash
   NEXT_PUBLIC_ADSENSE_BANNER_SLOT=1234567890
   NEXT_PUBLIC_ADSENSE_SQUARE_SLOT=0987654321
   ```

### 常见问题排查

#### 1. 时间问题
- **新审核通过**：需要等待24-48小时
- **新广告单元**：需要等待几小时生效

#### 2. 地理位置限制
- 某些地区可能看不到广告
- 尝试使用VPN切换到美国/欧洲

#### 3. 流量要求
- AdSense可能需要一定的网站流量才显示广告
- 新网站可能需要积累一些访问量

#### 4. 内容审核
- 即使网站通过审核，单个页面可能需要重新审核
- 确保内容符合AdSense政策

#### 5. 技术检查

**浏览器控制台检查**：
```javascript
// 检查自动广告是否启用
console.log('AdSense loaded:', !!window.adsbygoogle);

// 查看推送的广告
console.log('Ads pushed:', window.adsbygoogle?.length);
```

**Cookie同意检查**：
```javascript
// 检查同意状态
console.log('Cookie consent:', localStorage.getItem('cookie-consent'));
```

### 调试步骤

1. **访问 `/test-ads` 页面**检查状态
2. **确保接受Cookie同意**
3. **禁用广告拦截器**
4. **检查AdSense后台**是否有警告
5. **等待24-48小时**让新设置生效

### 成功标志

广告正常时应该看到：
- 页面上出现Google广告内容
- 控制台显示 "AutoAds: 自动广告已启用"
- 24小时后AdSense后台有展示数据

### 如果仍然看不到广告

1. **检查AdSense后台**：
   - 是否有政策违规通知
   - 自动广告是否开启
   - 支付信息是否完整

2. **联系AdSense支持**：
   - 如果超过48小时仍无广告
   - 在AdSense后台提交支持请求

3. **替代方案**：
   - 考虑其他广告网络（如Media.net）
   - 使用affiliate links
   - 添加赞助内容

记住：耐心是关键，AdSense需要时间学习您的网站和受众。