import { MetadataRoute } from 'next'

export async function GET(): Promise<Response> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://www.redverse.online',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.redverse.online/submit',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.redverse.online/dashboard',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .map(
    (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified instanceof Date ? url.lastModified.toISOString() : url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}