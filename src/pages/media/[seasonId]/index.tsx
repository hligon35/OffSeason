import Link from 'next/link'
import { MediaCard } from '@/components/media/MediaCard'
import Head from 'next/head'

export default function SeasonPage() {
  // Placeholder: use Next router to read seasonId and load from Firestore.
  const seasonId = 'season1'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/media/${encodeURIComponent(seasonId)}`

  return (
    <>
      <Head>
        <title>{`${seasonId} | Off Season`}</title>
        <meta name="description" content="Browse season episodes and entitlement-gated playback." />
        <meta name="keywords" content="Off Season season, episodes, signed playback" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${seasonId} | Off Season`} />
        <meta property="og:description" content="Browse season episodes and entitlement-gated playback." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${seasonId} | Off Season`} />
        <meta name="twitter:description" content="Browse season episodes and entitlement-gated playback." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
      </Head>

      <div className="mx-auto w-full max-w-4xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Season</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">{seasonId}</h1>
          <p className="mt-2 text-sm text-brand-gray-700">Episodes post here as they release.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MediaCard title="Episode 1" href={`/media/${seasonId}/s1e1`} />
          <MediaCard title="Episode 2" href={`/media/${seasonId}/s1e2`} />
        </div>

        <Link href="/account" className="text-sm text-brand-gray-700 hover:text-brand-red">
          Back to account
        </Link>
      </div>
    </>
  )
}
