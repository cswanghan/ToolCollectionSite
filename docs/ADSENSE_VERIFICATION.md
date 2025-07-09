# Google AdSense 网站验证指南

## 已完成的验证准备

1. **ads.txt文件** (`/public/ads.txt`)
   - 包含您的发布商ID
   - 允许Google爬虫访问

2. **Meta标签验证** (`app/layout.tsx`)
   ```html
   <meta name="google-adsense-account" content="ca-pub-4876317440241925" />
   ```

3. **AdSense脚本** 
   - 已在layout中添加AdSense JavaScript

4. **robots.txt配置**
   - 明确允许Google广告爬虫访问

## 验证步骤

### 1. 部署更新
```bash
git add -A
git commit -m "添加AdSense验证文件"
git push origin main
```

### 2. 验证文件可访问性
部署后检查以下URL是否可访问：
- `https://your-domain.com/ads.txt`
- `https://your-domain.com/robots.txt`

### 3. 在AdSense中验证

1. 返回Google AdSense控制台
2. 选择"添加网站"
3. 输入您的域名
4. 点击"验证"

### 4. 其他验证方法

如果自动验证失败，可以尝试：

**方法1: HTML文件验证**
1. 下载AdSense提供的HTML验证文件
2. 将文件放在`public/`目录下
3. 重新部署

**方法2: DNS记录验证**
1. 在域名提供商处添加TXT记录
2. 记录值由AdSense提供

## 常见问题

### Q: 验证失败怎么办？
- 确保网站已部署并可公开访问
- 检查是否有防火墙或CDN阻止Google爬虫
- 等待几分钟让更改生效

### Q: 需要多久才能验证成功？
- 通常几分钟内完成
- 最长可能需要24小时

### Q: 验证后多久可以展示广告？
- 验证成功后，AdSense会审核网站内容
- 审核通常需要24-48小时

## 下一步

验证成功后：
1. 创建广告单元获取Slot ID
2. 更新环境变量配置
3. 将广告占位符替换为真实广告组件