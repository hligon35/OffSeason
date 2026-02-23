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
  const currency = data.pricing.season.currency ?? 'USD'
  const episodeCurrency = data.pricing.episode.currency ?? currency

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
            className="flex w-full overflow-hidden rounded border border-brand-gray-200 bg-brand-white"
          >
            <div className="relative w-52 shrink-0 self-stretch bg-brand-black">
              {(() => {
                const isLogoThumb = ep.thumbnail === '/offseasonlogo.png' || ep.thumbnail === '/offseasonlogo.jpg'
                return (
                  <Image
                    src={ep.thumbnail}
                    alt={`Episode ${ep.episodeNumber} thumbnail`}
                    fill
                    sizes="208px"
                    className={isLogoThumb ? 'object-contain p-8' : 'object-cover'}
                  />
                )
              })()}
            </div>

            <div className="flex min-w-0 flex-1 flex-col p-4">
              <div className="flex min-w-0 items-start gap-2">
                <h3 className="min-w-0 text-sm font-[800]">
                  <Link
                    href={`/media/season${ep.season}/${ep.id}`}
                    className="block truncate hover:text-brand-red"
                    aria-label={`View Episode ${ep.episodeNumber}: ${ep.title}`}
                  >
                    Episode {ep.episodeNumber} • {ep.title}
                  </Link>
                </h3>
                <div className="shrink-0 rounded border border-brand-gray-200 bg-brand-white px-2 py-1 text-xs text-brand-gray-600">
                  {ep.runtime}
                </div>
              </div>

              <p className="mt-2 text-sm text-brand-gray-700">{ep.description}</p>

              <div className="mt-auto flex items-end justify-end pt-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
                  onClick={() => handleBuyEpisode(ep.id)}
                  aria-label={`Buy Episode ${ep.episodeNumber}`}
                >
                  Buy {formatMoney(data.pricing.episode.purchasePrice, episodeCurrency)}
                </button>
              </div>
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
