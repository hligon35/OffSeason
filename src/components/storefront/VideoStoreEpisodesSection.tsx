'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { startStripeCheckout } from '@/lib/stripe/client'

type StoreData = {
  pricing: {
    season: {
      purchasePrice: number
      rentalPrice?: number
      currency: string
    }
    episode: {
      purchasePrice: number
      rentalPrice?: number
      currency: string
    }
  }
  episodes: Array<{
    id: string
    season: number
    episodeNumber: number
    title: string
    runtime: string
    thumbnail: string
    description: string
    preview?: { label: string; vimeoOttEmbedUrl: string }
  }>
}

export function VideoStoreEpisodesSection({
  data,
  seasonProductId,
}: {
  data: StoreData
  seasonProductId: string
}) {
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null)
  const [expandedDescriptions, setExpandedDescriptions] = React.useState<Record<string, boolean>>({})
  const currency = data.pricing.season.currency ?? 'USD'
  const episodeCurrency = data.pricing.episode.currency ?? currency

  function toggleDescription(episodeId: string) {
    setExpandedDescriptions((prev) => ({ ...prev, [episodeId]: !prev[episodeId] }))
  }

  async function handleBuySeason() {
    setCheckoutError(null)
    try {
      await startStripeCheckout(seasonProductId)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start checkout.'
      setCheckoutError(msg)
    }
  }

  async function handleBuyEpisode(episodeId: string) {
    setCheckoutError(null)
    try {
      await startStripeCheckout(`media_${episodeId}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start checkout.'
      setCheckoutError(msg)
    }
  }

  return (
    <section id="episodes" className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6" aria-label="Episodes">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Episodes</div>
          <h2 className="mt-1 text-xl font-[800] tracking-tightish">Season One</h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-gray-700">{data.episodes.length} episodes.</p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
            onClick={handleBuySeason}
            aria-label="Buy Season One"
          >
            Buy Season {formatMoney(data.pricing.season.purchasePrice, currency)}
          </button>
        </div>

        {checkoutError ? (
          <div className="mt-3 w-full rounded border border-brand-gray-200 bg-brand-gray-50 px-3 py-2 text-sm text-brand-gray-700" role="alert">
            {checkoutError}
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {data.episodes.map((ep) => (
          <article
            key={ep.id}
            className="flex aspect-square w-full flex-col overflow-hidden rounded border border-brand-gray-200 bg-brand-white sm:aspect-auto sm:flex-row"
          >
            <div className="relative aspect-video w-full bg-brand-black sm:aspect-auto sm:w-52 sm:shrink-0 sm:self-stretch">
              {(() => {
                const isLogoThumb = ep.thumbnail === '/offseasonlogo.png' || ep.thumbnail === '/offseasonlogo.jpg'
                return (
                  <Image
                    src={ep.thumbnail}
                    alt={`Episode ${ep.episodeNumber} thumbnail`}
                    fill
                    sizes="(min-width: 640px) 208px, 100vw"
                    className={isLogoThumb ? 'object-contain p-8' : 'object-cover'}
                  />
                )
              })()}
            </div>

            <div className="flex min-w-0 flex-1 flex-col p-4 pb-8 sm:pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-2">
                  <h3 className="min-w-0 text-sm font-[800]">
                    <Link
                      href={`/media/season${ep.season}/${ep.id}`}
                      className="block line-clamp-2 hover:text-brand-red sm:truncate"
                      aria-label={`View Episode ${ep.episodeNumber}: ${ep.title}`}
                    >
                      Episode {ep.episodeNumber} • {ep.title}
                    </Link>
                  </h3>

                  <div className="shrink-0 rounded border border-brand-gray-200 bg-brand-white px-2 py-1 text-xs text-brand-gray-600">
                    {ep.runtime}
                  </div>
                </div>

                <button
                  type="button"
                  className="shrink-0 rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
                  onClick={() => handleBuyEpisode(ep.id)}
                  aria-label={`Buy Episode ${ep.episodeNumber}`}
                >
                  Buy {formatMoney(data.pricing.episode.purchasePrice, episodeCurrency)}
                </button>
              </div>

              <div className="relative mt-2">
                <p
                  className={
                    expandedDescriptions[ep.id]
                      ? 'pr-12 text-sm text-brand-gray-700 sm:pr-0 sm:line-clamp-none'
                      : 'line-clamp-3 pr-12 text-sm text-brand-gray-700 sm:pr-0 sm:line-clamp-none'
                  }
                >
                  {ep.description}
                </p>

                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-brand-white pl-2 font-[800] text-brand-gray-700 underline underline-offset-2 hover:text-brand-red sm:hidden"
                  onClick={() => toggleDescription(ep.id)}
                  aria-label={
                    expandedDescriptions[ep.id]
                      ? `Collapse description for Episode ${ep.episodeNumber}: ${ep.title}`
                      : `Expand description for Episode ${ep.episodeNumber}: ${ep.title}`
                  }
                >
                  {expandedDescriptions[ep.id] ? 'less' : 'more'}
                </button>
              </div>

              <div className="mt-auto" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}
