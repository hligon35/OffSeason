import { createCTAButton } from './CTAButton.js'

/**
 * EpisodeCard
 *
 * How to replace placeholder Vimeo OTT embeds:
 * - Update `vimeoOttEmbedUrl` in data/storeData.json to your real Vimeo OTT embed URL.
 * - Vimeo OTT typically provides a player URL you can embed in an <iframe>.
 *
 * How to replace placeholder purchase URLs:
 * - Update `purchaseUrl` and `rentalUrl` in data/storeData.json.
 */

export function createEpisodeCard({ episode, pricing, handlers }) {
  const card = document.createElement('article')
  card.className = 'episodeCard'
  card.setAttribute('aria-label', `Episode ${episode.episodeNumber}: ${episode.title}`)

  const thumbWrap = document.createElement('div')
  thumbWrap.className = 'episodeCard__thumb'

  const img = document.createElement('img')
  img.src = episode.thumbnail
  img.alt = `Episode ${episode.episodeNumber} thumbnail`
  img.loading = 'lazy'
  img.decoding = 'async'

  thumbWrap.appendChild(img)

  const body = document.createElement('div')
  body.className = 'episodeCard__body'

  const meta = document.createElement('div')
  meta.className = 'episodeCard__meta'

  const epTitle = document.createElement('h3')
  epTitle.className = 'episodeCard__title'
  epTitle.textContent = `Episode ${episode.episodeNumber} • ${episode.title}`

  const runtime = document.createElement('div')
  runtime.className = 'episodeCard__runtime'
  runtime.textContent = episode.runtime

  meta.append(epTitle, runtime)

  const desc = document.createElement('p')
  desc.className = 'episodeCard__desc'
  desc.textContent = episode.description

  const actions = document.createElement('div')
  actions.className = 'episodeCard__actions'

  const buyLabel = `Buy • $${Number(pricing.purchasePrice).toFixed(2)}`
  const rentLabel = pricing.rentalPrice != null ? `Rent • $${Number(pricing.rentalPrice).toFixed(2)}` : null

  const buyBtn = createCTAButton({
    label: buyLabel,
    variant: 'primary',
    onClick: () => handlers.handlePurchase({
      scope: 'episode',
      id: episode.id,
      url: episode.purchaseUrl,
      price: pricing.purchasePrice,
    }),
    ariaLabel: `Buy Episode ${episode.episodeNumber}`,
  })

  const previewBtn = createCTAButton({
    label: 'Watch Preview',
    variant: 'secondary',
    onClick: () => handlers.handlePlayPreview({
      scope: 'episode',
      id: episode.id,
      title: `Episode ${episode.episodeNumber}: ${episode.title}`,
      embedUrl: episode.preview?.vimeoOttEmbedUrl,
    }),
    ariaLabel: `Watch preview for Episode ${episode.episodeNumber}`,
    icon: '▶',
  })

  actions.append(buyBtn, previewBtn)

  if (rentLabel) {
    const rentBtn = createCTAButton({
      label: rentLabel,
      variant: 'ghost',
      onClick: () => handlers.handleRent({
        scope: 'episode',
        id: episode.id,
        url: episode.rentalUrl,
        price: pricing.rentalPrice,
      }),
      ariaLabel: `Rent Episode ${episode.episodeNumber}`,
    })
    actions.appendChild(rentBtn)
  }

  const addToCartBtn = createCTAButton({
    label: 'Add to Cart',
    variant: 'outline',
    onClick: () => handlers.handleAddToCart({
      scope: 'episode',
      id: episode.id,
      title: episode.title,
      price: pricing.purchasePrice,
    }),
    ariaLabel: `Add Episode ${episode.episodeNumber} to cart`,
  })

  actions.appendChild(addToCartBtn)

  body.append(meta, desc, actions)
  card.append(thumbWrap, body)

  return card
}
