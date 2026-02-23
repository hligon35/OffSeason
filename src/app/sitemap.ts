import type { MetadataRoute } from 'next'
import { getSiteOrigin } from '@/lib/siteUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteOrigin()
  const now = new Date()

  // Static routes only (dynamic content should be added once backed by Firestore/CMS).
  const paths = [
    '/',
    '/the-show',
    '/podcast',
    '/forums',
    // Keep auth/checkout routes out of the sitemap.
    '/media',
    '/merch',
  ]

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.6,
  }))
}
