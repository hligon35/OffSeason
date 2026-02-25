import { MediaCard } from '@/components/media/MediaCard'
import { PRODUCTS } from '@/lib/products/catalog'
import Head from 'next/head'

export default function MediaIndexPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/media`

  const mediaProducts = PRODUCTS.filter((p) => p.kind === 'digital')

  return (
    <>
      <Head>
        <title>Media Library | Off Season</title>
        <meta name="description" content="Browse Off Season seasons and episodes. Playback is entitlement-gated and uses signed URLs." />
        <meta name="keywords" content="Off Season media, seasons, episodes, signed playback, entitlements" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Media Library | Off Season" />
        <meta property="og:description" content="Browse seasons and episodes with entitlement-gated playback." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Media Library | Off Season" />
        <meta name="twitter:description" content="Browse seasons and episodes with entitlement-gated playback." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
      </Head>

      <div className="mx-auto w-full max-w-4xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Media</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Season library</h1>
          <p className="mt-2 text-sm text-brand-gray-700">Full episodes, in order.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mediaProducts.map((p) => (
            <MediaCard key={p.productId} title={p.title} description={p.description} href={`/media/season1`} />
          ))}
        </div>
      </div>
    </>
  )
}
