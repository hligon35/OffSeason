import { createCTAButton } from './components/CTAButton.js'
import { createPricingBlock } from './components/PricingBlock.js'
import { createEpisodeCard } from './components/EpisodeCard.js'

/**
 * store.js
 *
 * Integration notes (Vimeo OTT):
 * - Today: we only embed via <iframe> using URLs from data/storeData.json.
 * - Later: replace handlePurchase/handleRent/handleAddToCart with real checkout/cart logic.
 * - If you use Vimeo OTT APIs, this is where you’d:
 *   - fetch entitlements for the current user
 *   - display “Watch” vs “Buy” depending on access
 *   - create checkout sessions and redirect to payment
 */

const DATA_URL = './data/storeData.json'

const handlers = {
  handlePurchase,
  handleRent,
  handlePlayPreview,
  handleAddToCart,
}

init().catch((err) => {
  console.error('[Video Store] Failed to initialize', err)
  showFatalError('Failed to load store data.')
})

async function init() {
  document.getElementById('year').textContent = String(new Date().getFullYear())

  const data = await loadStoreData(DATA_URL)

  renderHero(data)
  renderPricing(data)
  renderEpisodes(data)

  wireDialogAutopause()
}

async function loadStoreData(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`)
  return res.json()
}

function renderHero(data) {
  const titleEl = document.getElementById('showTitle')
  const taglineEl = document.getElementById('showTagline')
  const bgEl = document.querySelector('.hero__bg')
  const metaEl = document.getElementById('heroMeta')

  titleEl.textContent = data.show.title
  taglineEl.textContent = data.show.tagline

  // Background image: set via inline style so it can be data-driven.
  // Replace `heroBackgroundImage` in data/storeData.json.
  if (data.show.heroBackgroundImage) {
    bgEl.style.backgroundImage = `url("${escapeCssUrl(data.show.heroBackgroundImage)}")`
  }

  // Trailer CTA
  const trailerCtaMount = document.getElementById('heroTrailerCta')
  trailerCtaMount.replaceChildren(
    createCTAButton({
      label: 'Watch Trailer',
      variant: 'secondary',
      icon: '▶',
      onClick: () => handlers.handlePlayPreview({
        scope: 'trailer',
        id: 'trailer',
        title: data.show.trailer?.label ?? 'Trailer',
        embedUrl: data.show.trailer?.vimeoOttEmbedUrl,
      }),
      ariaLabel: 'Watch trailer',
    })
  )

  // Buy season CTA
  const buySeasonMount = document.getElementById('heroBuySeasonCta')
  buySeasonMount.replaceChildren(
    createCTAButton({
      label: 'Buy Season',
      variant: 'primary',
      onClick: () => handlers.handlePurchase({
        scope: 'season',
        id: 'season-1',
        url: data.pricing?.season?.purchaseUrl,
        price: data.pricing?.season?.purchasePrice,
      }),
      ariaLabel: 'Buy season one',
    })
  )

  const purchase = data.pricing?.season?.purchasePrice
  const rent = data.pricing?.season?.rentalPrice
  const currency = data.pricing?.season?.currency ?? 'USD'

  metaEl.textContent = `Season One • ${formatMoney(purchase, currency)} to buy${rent != null ? ` • ${formatMoney(rent, currency)} to rent` : ''}`
}

function escapeCssUrl(value) {
  // Minimal escaping for CSS url("...") to avoid breaking the style attribute.
  // Not a security boundary; you should only ship trusted URLs in your JSON.
  return String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')
}

function renderPricing(data) {
  const pricingMount = document.getElementById('pricingMount')
  pricingMount.replaceChildren(
    createPricingBlock({
      pricing: data.pricing,
      handlers,
    })
  )
}

function renderEpisodes(data) {
  const grid = document.getElementById('episodeGrid')
  grid.replaceChildren()

  for (const episode of data.episodes) {
    const card = createEpisodeCard({
      episode,
      pricing: data.pricing.episode,
      handlers,
    })
    card.setAttribute('role', 'listitem')
    grid.appendChild(card)
  }
}

function showFatalError(message) {
  const titleEl = document.getElementById('showTitle')
  titleEl.textContent = message
}

/**
 * PLACEHOLDER FUNCTIONS
 *
 * Replace placeholder purchase URLs:
 * - Update purchaseUrl/rentalUrl in data/storeData.json.
 * - Later, you can redirect to these URLs or call your backend to create a checkout.
 */

export function handlePurchase(payload) {
  console.log('[Purchase]', payload)
}

export function handleRent(payload) {
  console.log('[Rent]', payload)
}

export function handleAddToCart(payload) {
  console.log('[AddToCart]', payload)
}

export function handlePlayPreview({ title, embedUrl, ...rest }) {
  console.log('[PlayPreview]', { title, embedUrl, ...rest })

  if (!embedUrl) {
    console.warn('[PlayPreview] Missing embedUrl')
    return
  }

  openPlayerDialog({ title, embedUrl })
}

function openPlayerDialog({ title, embedUrl }) {
  const dialog = document.getElementById('playerDialog')
  const iframe = document.getElementById('playerFrame')
  const titleEl = document.getElementById('playerDialogTitle')

  titleEl.textContent = title || 'Player'

  // Important: use the embed URL directly.
  // This is where you’ll swap placeholder Vimeo OTT embed codes for real ones.
  iframe.src = embedUrl

  if (typeof dialog.showModal === 'function') {
    dialog.showModal()
  } else {
    // Very old browser fallback: open in a new tab.
    window.open(embedUrl, '_blank', 'noopener,noreferrer')
  }
}

function wireDialogAutopause() {
  const dialog = document.getElementById('playerDialog')
  const iframe = document.getElementById('playerFrame')

  // When the dialog closes, clear src so playback stops.
  dialog.addEventListener('close', () => {
    iframe.src = ''
  })

  // ESC key closes <dialog> by default. This ensures the iframe resets.
  dialog.addEventListener('cancel', () => {
    iframe.src = ''
  })
}

function formatMoney(amount, currency) {
  if (typeof amount !== 'number') return ''
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}
