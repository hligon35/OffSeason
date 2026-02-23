import Link from 'next/link'
import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { EpisodePlayer } from '@/components/media/EpisodePlayer'
import storeData from '@/lib/storefront/storeData.json'

type Episode = (typeof storeData)['episodes'][number]

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: storeData.episodes.map((ep) => ({
      params: {
        seasonId: `season${ep.season}`,
        episodeId: ep.id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  episode: Episode
  canonical: string
  productIds: string[]
}> = async (ctx) => {
  const seasonId = String(ctx.params?.seasonId ?? '')
  const episodeId = String(ctx.params?.episodeId ?? '')
  const episode = storeData.episodes.find((ep) => ep.id === episodeId) ?? null
  if (!episode) return { notFound: true }

  const expectedSeasonId = `season${episode.season}`
  if (seasonId !== expectedSeasonId) return { notFound: true }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io').replace(/\/$/, '')

  return {
    props: {
      episode,
      canonical: `${siteUrl}/media/${seasonId}/${episodeId}`,
      productIds: [`media_season${episode.season}`, `media_${episode.id}`],
    },
  }
}

export default function EpisodePage({
  episode,
  canonical,
  productIds,
}: {
  episode: Episode
  canonical: string
  productIds: string[]
}) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io').replace(/\/$/, '')
  const title = `Episode ${episode.episodeNumber} — ${episode.title} | Off Season`
  const description = `Watch Episode ${episode.episodeNumber} of Off Season: ${episode.title}.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Off Season episode, Off Season TV, full episode, signed playback, entitlements" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="video.episode" />
        <meta property="og:image" content={`${siteUrl}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/offseasonlogo.png`} />
      </Head>

      <div className="mx-auto w-full max-w-3xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Episode</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">
            Episode {episode.episodeNumber} • {episode.title}
          </h1>
          <p className="mt-2 text-sm text-brand-gray-700">{episode.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/the-show#episodes"
              className="rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
            >
              Get access on The Show
            </Link>
            <Link href="/account" className="text-sm text-brand-gray-700 hover:text-brand-red">
              Account
            </Link>
          </div>
        </div>

        <EpisodePlayer
          episodeId={episode.id}
          productIds={productIds}
          episodeTitle={episode.title}
          seasonNumber={episode.season}
          episodeNumber={episode.episodeNumber}
          posterSrc={episode.thumbnail}
        />
      </div>
    </>
  )
}
