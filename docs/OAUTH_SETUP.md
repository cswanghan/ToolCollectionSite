# OAuth 配置指南 - 修复 Vercel 部署 400 错误

## 问题诊断

您遇到的 400 错误是因为 OAuth 重定向 URL 配置不匹配。当部署到 Vercel 时，重定向 URL 必须与 Supabase 中配置的完全一致。

## 解决步骤

### 1. 在 Supabase Dashboard 配置 OAuth

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard/project/iazzehufkcdsfkfyvldj/auth/providers)
2. 找到 **GitHub** 和 **Google** Provider 设置

### 2. 配置 GitHub OAuth

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App 或更新现有的
3. 设置以下信息：
   ```
   Application name: Tool Collection Site
   Homepage URL: https://your-vercel-app.vercel.app
   Authorization callback URL: https://iazzehufkcdsfkfyvldj.supabase.co/auth/v1/callback
   ```
4. 获取 Client ID 和 Client Secret
5. 在 Supabase Dashboard 中：
   - 启用 GitHub provider
   - 填入 Client ID 和 Client Secret
   - **重要**: 添加以下 Redirect URLs（每行一个）：
     ```
     http://localhost:3000/auth/callback
     https://your-vercel-app.vercel.app/auth/callback
     https://iazzehufkcdsfkfyvldj.supabase.co/auth/v1/callback
     ```

### 3. 配置 Google OAuth

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据
5. 添加授权的重定向 URI：
   ```
   https://iazzehufkcdsfkfyvldj.supabase.co/auth/v1/callback
   ```
6. 在 Supabase Dashboard 中：
   - 启用 Google provider
   - 填入 Client ID 和 Client Secret
   - 添加相同的 Redirect URLs

### 4. 更新 Vercel 环境变量

确保在 Vercel 项目设置中有以下环境变量：
```
NEXT_PUBLIC_SUPABASE_URL=https://iazzehufkcdsfkfyvldj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
```

### 5. 验证检查清单

- [ ] Supabase Dashboard 中已启用 OAuth providers
- [ ] Client ID 和 Secret 已正确填写
- [ ] Redirect URLs 包含所有环境（localhost、Vercel、Supabase）
- [ ] Vercel 环境变量已配置
- [ ] 重新部署 Vercel 应用

## 常见问题

### Q: 为什么会出现 400 错误？
A: Supabase 的 OAuth 流程要求重定向 URL 必须在白名单中。如果请求的 redirect_to 参数不在配置的 URLs 列表中，就会返回 400 错误。

### Q: 需要等多久生效？
A: Supabase 配置更新通常立即生效，但 OAuth provider（GitHub/Google）的更改可能需要几分钟。

### Q: 如何测试？
A: 先在本地测试（http://localhost:3000），确认工作后再测试 Vercel 部署版本。