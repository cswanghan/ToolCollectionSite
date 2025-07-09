# AdSense 调试指南

## 快速检查清单

### 1. 访问测试页面
访问 `/test-ads` 页面查看AdSense状态和测试广告显示。

### 2. 浏览器控制台检查

打开浏览器开发者工具（F12），在Console中查看：

```javascript
// 检查AdSense是否加载
window.adsbygoogle

// 查看已推送的广告数量
window.adsbygoogle.loaded
window.adsbygoogle.push.length
```

### 3. Network标签检查

在Network标签中搜索：
- `adsbygoogle.js` - 应该返回200状态码
- `adsbygoogle` - 查看广告请求

### 4. 常见问题排查

#### 看到广告占位符但没有真实广告

**可能原因：**
1. **Slot ID未配置** - 需要在`.env.local`中配置
2. **网站未审核通过** - AdSense需要审核您的网站
3. **开发环境限制** - AdSense可能不在localhost显示广告
4. **广告拦截器** - 确保禁用广告拦截器

#### 控制台错误

**常见错误及解决方案：**

1. `adsbygoogle.push() error: No slot size for availableWidth=0`
   - 广告容器宽度为0，检查CSS样式

2. `TagError: adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them`
   - 重复推送广告，检查组件是否多次渲染

3. `403 Forbidden`
   - 可能是域名未授权或IP被限制

#### Cookie同意问题

确保：
1. 接受了Cookie同意
2. 清除localStorage重新测试：
   ```javascript
   localStorage.removeItem('cookie-consent')
   ```

### 5. AdSense后台检查

登录 [Google AdSense](https://www.google.com/adsense/) 检查：

1. **网站状态** - 是否已通过审核
2. **广告单元** - 是否已创建并获取Slot ID
3. **爬虫访问** - ads.txt是否可访问
4. **违规警告** - 是否有政策违规

### 6. 生产环境测试

AdSense在以下情况可能不显示广告：
- localhost开发环境
- 未备案的域名（某些地区）
- VPN或特定IP地址

**建议：**
1. 部署到Vercel后测试
2. 使用真实域名
3. 从不同IP地址访问

### 7. 成功标志

广告加载成功时：
- 广告位显示Google广告内容
- Console显示"AdSense: Pushing ad unit"
- Network中有成功的广告请求
- 无错误信息

### 8. 收益追踪

广告正常显示后：
- 24-48小时后在AdSense后台看到数据
- 包括展示次数、点击率、收益等

## 有用的调试代码

```javascript
// 在浏览器控制台运行

// 查看所有广告单元
document.querySelectorAll('.adsbygoogle').forEach((ad, index) => {
  console.log(`广告单元 ${index + 1}:`, {
    'data-ad-client': ad.getAttribute('data-ad-client'),
    'data-ad-slot': ad.getAttribute('data-ad-slot'),
    'data-ad-format': ad.getAttribute('data-ad-format'),
    'width': ad.offsetWidth,
    'height': ad.offsetHeight,
    'hasContent': ad.innerHTML.length > 0
  })
})

// 手动推送广告
(adsbygoogle = window.adsbygoogle || []).push({})
```

## 联系支持

如果问题持续：
1. 查看 [AdSense帮助中心](https://support.google.com/adsense)
2. 在AdSense后台提交支持请求
3. 检查是否有政策违规通知