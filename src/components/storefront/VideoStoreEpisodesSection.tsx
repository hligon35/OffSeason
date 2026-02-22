'use client'

import Image from 'next/image'

type StoreData = {
  pricing: {
    season: {
      purchasePrice: number
      rentalPrice?: number
      currency: string
      purchaseUrl: string
      rentalUrl?: string
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
    purchaseUrl: string
    rentalUrl?: string
  }>
}

export function VideoStoreEpisodesSection({
  data,
  onPurchase,
}: {
  data: StoreData
  onPurchase?: (payload: unknown) => void
}) {
  const currency = data.pricing.season.currency ?? 'USD'
  const episodeBuyLabel = `Buy • ${formatMoney(data.pricing.episode.purchasePrice, currency)}`

  function handlePurchase(payload: unknown) {
    if (onPurchase) return onPurchase(payload)
    console.log('[Purchase]', payload)
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
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">
            {formatMoney(data.pricing.season.purchasePrice, currency)} season
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
            onClick={() =>
              handlePurchase({
                scope: 'season',
                id: 'season-1',
                url: data.pricing.season.purchaseUrl,
                price: data.pricing.season.purchasePrice,
              })
            }
            aria-label="Buy Season One"
          >
            Buy Season
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.episodes.map((ep) => (
          <article key={ep.id} className="overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
            <div className="relative aspect-[16/9] w-full bg-brand-black">
              {(() => {
                const isLogoThumb = ep.thumbnail === '/offseasonlogo.png' || ep.thumbnail === '/offseasonlogo.jpg'
                return (
                  <Image
                    src={ep.thumbnail}
                    alt={`Episode ${ep.episodeNumber} thumbnail`}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={isLogoThumb ? 'object-contain p-8' : 'object-cover'}
                  />
                )
              })()}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-[800]">
                  Episode {ep.episodeNumber} • {ep.title}
                </h3>
                <div className="shrink-0 rounded border border-brand-gray-200 bg-brand-white px-2 py-1 text-xs text-brand-gray-600">
                  {ep.runtime}
                </div>
              </div>
              <p className="mt-2 text-sm text-brand-gray-700">{ep.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
                  onClick={() => handlePurchase({ scope: 'episode', id: ep.id, url: ep.purchaseUrl })}
                  aria-label={`Buy episode ${ep.episodeNumber}`}
                >
                  {episodeBuyLabel}
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
