export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          最后更新：{new Date().toLocaleDateString('zh-CN')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 我们收集的信息</h2>
          <p>我们可能收集以下类型的信息：</p>
          <ul>
            <li>使用信息：包括您访问的页面、点击的链接等</li>
            <li>设备信息：包括IP地址、浏览器类型、操作系统等</li>
            <li>Cookie和类似技术收集的信息</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Cookie使用</h2>
          <p>我们使用Cookie来：</p>
          <ul>
            <li>记住您的偏好设置</li>
            <li>提供个性化广告</li>
            <li>分析网站使用情况</li>
            <li>改善用户体验</li>
          </ul>
          <p className="mt-4">
            您可以通过浏览器设置管理或删除Cookie。请注意，禁用Cookie可能会影响网站的某些功能。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 第三方服务</h2>
          <p>我们使用以下第三方服务：</p>
          <ul>
            <li><strong>Google AdSense：</strong>用于展示广告。Google可能使用Cookie来展示基于您兴趣的广告。</li>
            <li><strong>Google Analytics：</strong>用于分析网站流量和使用情况。</li>
          </ul>
          <p className="mt-4">
            这些第三方服务有自己的隐私政策，我们建议您查阅相关政策。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 数据安全</h2>
          <p>
            我们采取合理的技术和组织措施来保护您的信息安全。但请注意，没有任何互联网传输方法是100%安全的。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 您的权利</h2>
          <p>根据适用法律，您可能拥有以下权利：</p>
          <ul>
            <li>访问我们持有的关于您的个人信息</li>
            <li>更正不准确的信息</li>
            <li>删除您的个人信息</li>
            <li>反对或限制某些处理活动</li>
            <li>数据可携带性</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 儿童隐私</h2>
          <p>
            我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 政策更新</h2>
          <p>
            我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并在页面顶部显示更新日期。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 联系我们</h2>
          <p>
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
          </p>
          <p>
            电子邮件：[your-email@example.com]
          </p>
        </section>
      </div>
    </div>
  )
}