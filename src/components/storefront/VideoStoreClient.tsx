'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

type StoreData = {
  show: {
    title: string
    tagline: string
    heroBackgroundImage: string
    trailer: { label: string; vimeoOttEmbedUrl: string }
  }
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

type PlayerState = {
  open: boolean
  title: string
  embedUrl: string
}

/**
 * VideoStoreClient
 *
 * Replace placeholder Vimeo OTT embed codes:
 * - Update `vimeoOttEmbedUrl` fields in `src/lib/storefront/storeData.json`.
 *
 * Replace placeholder purchase URLs:
 * - Update `purchaseUrl` / `rentalUrl` fields in the same JSON.
 *
 * Integrate real Vimeo OTT API calls later:
 * - Replace handlePurchase/handleRent/handleAddToCart with your checkout + entitlement logic.
 */
export function VideoStoreClient({ data }: { data: StoreData }) {
  const [player, setPlayer] = useState<PlayerState>({ open: false, title: '', embedUrl: '' })
  const lastActiveElRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const currency = data.pricing.season.currency ?? 'USD'

  const seasonBuyLabel = useMemo(
    () => `Buy Season • ${formatMoney(data.pricing.season.purchasePrice, currency)}`,
    [currency, data.pricing.season.purchasePrice]
  )

  const seasonRentLabel = useMemo(() => {
    if (data.pricing.season.rentalPrice == null) return null
    return `Rent Season • ${formatMoney(data.pricing.season.rentalPrice, currency)}`
  }, [currency, data.pricing.season.rentalPrice])

  const episodeBuyLabel = useMemo(
    () => `Buy • ${formatMoney(data.pricing.episode.purchasePrice, currency)}`,
    [currency, data.pricing.episode.purchasePrice]
  )

  useEffect(() => {
    if (!player.open) return
    lastActiveElRef.current = (document.activeElement as HTMLElement) ?? null
    closeBtnRef.current?.focus()
  }, [player.open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPlayer((s) => ({ ...s, open: false, embedUrl: '' }))
      }
    }

    if (player.open) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [player.open])

  useEffect(() => {
    if (player.open) return
    lastActiveElRef.current?.focus?.()
  }, [player.open])

  function handlePurchase(payload: unknown) {
    // Placeholder: replace with real checkout flow.
    console.log('[Purchase]', payload)
  }

  function handleRent(payload: unknown) {
    // Placeholder: replace with real rental flow.
    console.log('[Rent]', payload)
  }

  function handleAddToCart(payload: unknown) {
    // Placeholder: replace with cart backend.
    console.log('[AddToCart]', payload)
  }

  function handlePlayPreview({ title, embedUrl, ...rest }: { title: string; embedUrl?: string } & Record<string, unknown>) {
    // Placeholder: replace with entitlement-gated playback.
    console.log('[PlayPreview]', { title, embedUrl, ...rest })

    if (!embedUrl) return
    setPlayer({ open: true, title, embedUrl })
  }

  return (
    <div className="space-y-6">
      {/* In-page navigation bar (requested) */}
      <nav
        className="sticky top-[56px] z-10 -mx-3 border-b border-brand-gray-200 bg-brand-white/90 px-3 py-2 backdrop-blur sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6"
        aria-label="Video Store"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image src="/offseasonlogo.png" alt="The Off Season" width={120} height={28} className="h-6 w-auto" />
            <span className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Video Store</span>
          </div>
          <div className="flex max-w-full items-center gap-2 overflow-x-auto text-xs font-[800] uppercase tracking-wide">
            <a className="whitespace-nowrap rounded px-2 py-1 hover:bg-brand-gray-100" href="#top">Home</a>
            <a className="whitespace-nowrap rounded px-2 py-1 hover:bg-brand-gray-100" href="#episodes">Episodes</a>
            <a className="whitespace-nowrap rounded px-2 py-1 hover:bg-brand-gray-100" href="#trailer">Trailer</a>
            <a className="whitespace-nowrap rounded px-2 py-1 hover:bg-brand-gray-100" href="#about">About</a>
            <a className="whitespace-nowrap rounded px-2 py-1 hover:bg-brand-gray-100" href="#support">Support</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        className="relative overflow-hidden rounded border border-brand-gray-200 bg-brand-black text-brand-white"
        aria-label="Hero"
      >
        <div className="absolute inset-0">
          <Image
            src={data.show.heroBackgroundImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-brand-black" />
        </div>

        <div className="relative px-5 py-8 sm:px-8 sm:py-10">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-300">Video Store</div>
          <h1 className="mt-2 text-3xl font-[800] tracking-tightish sm:text-4xl">{data.show.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-brand-gray-200 sm:text-base">{data.show.tagline}</p>

          <div id="trailer" className="mt-6 flex flex-wrap items-center gap-3" role="group" aria-label="Hero actions">
            <button
              type="button"
              onClick={() => handlePlayPreview({
                scope: 'trailer',
                id: 'trailer',
                title: data.show.trailer.label,
                embedUrl: data.show.trailer.vimeoOttEmbedUrl,
              })}
              className="inline-flex items-center justify-center rounded bg-brand-white px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black hover:bg-brand-gray-100"
            >
              Watch Trailer
            </button>

            <button
              type="button"
              onClick={() => handlePurchase({
                scope: 'season',
                id: 'season-1',
                url: data.pricing.season.purchaseUrl,
                price: data.pricing.season.purchasePrice,
              })}
              className="inline-flex items-center justify-center rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
            >
              Buy Season
            </button>
          </div>

          <div className="mt-4 text-xs text-brand-gray-300">
            Season One • {seasonBuyLabel}
            {seasonRentLabel ? ` • ${seasonRentLabel}` : null}
          </div>
        </div>
      </section>

      {/* EPISODES */}
      <section id="episodes" className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6" aria-label="Episodes">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Episodes</div>
            <h2 className="mt-1 text-xl font-[800] tracking-tightish">Season One</h2>
            <p className="mt-2 max-w-2xl text-sm text-brand-gray-700">5 episodes.</p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">
              {formatMoney(data.pricing.season.purchasePrice, currency)} season
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
              onClick={() => handlePurchase({
                scope: 'season',
                id: 'season-1',
                url: data.pricing.season.purchaseUrl,
                price: data.pricing.season.purchasePrice,
              })}
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

      {/* ABOUT + SUPPORT */}
      <section id="about" className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6" aria-label="About">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">About</div>
        <p className="mt-3 max-w-3xl text-sm text-brand-gray-700">
          This page is ready for Vimeo OTT integration. Swap placeholder embed URLs and purchase URLs in
          <span className="font-[800]"> src/lib/storefront/storeData.json</span>, then replace the placeholder handlers
          with real purchase + entitlement checks.
        </p>
      </section>

      <section id="support" className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6" aria-label="Support">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Support</div>
        <p className="mt-3 text-sm text-brand-gray-700">Replace this with your support email/FAQ links.</p>
      </section>

      {/* PLAYER MODAL */}
      {player.open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="playerTitle"
          onMouseDown={(e) => {
            // Close when clicking the backdrop.
            if (e.target === e.currentTarget) setPlayer((s) => ({ ...s, open: false, embedUrl: '' }))
          }}
        >
          <div className="w-full max-w-4xl overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
            <div className="flex items-center justify-between gap-3 border-b border-brand-gray-200 px-4 py-3">
              <div id="playerTitle" className="text-sm font-[800]">
                {player.title}
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex items-center justify-center rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-gray-900"
                onClick={() => setPlayer((s) => ({ ...s, open: false, embedUrl: '' }))}
                aria-label="Close player"
              >
                Close
              </button>
            </div>

            <div className="bg-brand-black">
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={player.embedUrl}
                  title={player.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}
