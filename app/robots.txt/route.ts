export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: Adsbot-Google
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/sitemap.xml
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}