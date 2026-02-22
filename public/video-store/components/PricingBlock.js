import { createCTAButton } from './CTAButton.js'

/**
 * PricingBlock
 *
 * Placeholder purchase actions:
 * - Buttons call handlers that currently log to the console.
 * - Later, wire these to your checkout/cart backend or Vimeo OTT purchase flows.
 */

export function createPricingBlock({ pricing, handlers }) {
  const wrap = document.createElement('section')
  wrap.className = 'pricing'
  wrap.id = 'pricing'
  wrap.setAttribute('aria-label', 'Pricing')

  const header = document.createElement('div')
  header.className = 'pricing__header'

  const h2 = document.createElement('h2')
  h2.className = 'pricing__title'
  h2.textContent = 'Pricing'

  const p = document.createElement('p')
  p.className = 'pricing__subtitle'
  p.textContent = 'Buy or rent the full season, or purchase episodes individually.'

  header.append(h2, p)

  const grid = document.createElement('div')
  grid.className = 'pricing__grid'

  const seasonCard = document.createElement('div')
  seasonCard.className = 'pricingCard'
  seasonCard.setAttribute('aria-label', 'Season pricing')

  const seasonTitle = document.createElement('div')
  seasonTitle.className = 'pricingCard__title'
  seasonTitle.textContent = 'Season 1'

  const seasonPrices = document.createElement('dl')
  seasonPrices.className = 'pricingCard__prices'

  const currency = pricing.season.currency ?? 'USD'

  seasonPrices.append(
    priceRow('Buy season', formatMoney(pricing.season.purchasePrice, currency)),
    ...(pricing.season.rentalPrice != null ? [priceRow('Rent season', formatMoney(pricing.season.rentalPrice, currency))] : [])
  )

  const seasonActions = document.createElement('div')
  seasonActions.className = 'pricingCard__actions'

  seasonActions.append(
    createCTAButton({
      label: 'Buy Season',
      variant: 'primary',
      onClick: () => handlers.handlePurchase({
        scope: 'season',
        id: 'season-1',
        url: pricing.season.purchaseUrl,
        price: pricing.season.purchasePrice,
      }),
      ariaLabel: 'Buy Season 1',
    })
  )

  if (pricing.season.rentalPrice != null) {
    seasonActions.append(
      createCTAButton({
        label: 'Rent Season',
        variant: 'secondary',
        onClick: () => handlers.handleRent({
          scope: 'season',
          id: 'season-1',
          url: pricing.season.rentalUrl,
          price: pricing.season.rentalPrice,
        }),
        ariaLabel: 'Rent Season 1',
      })
    )
  }

  seasonActions.append(
    createCTAButton({
      label: 'Add Season to Cart',
      variant: 'outline',
      onClick: () => handlers.handleAddToCart({
        scope: 'season',
        id: 'season-1',
        title: 'Season 1',
        price: pricing.season.purchasePrice,
      }),
      ariaLabel: 'Add Season 1 to cart',
    })
  )

  seasonCard.append(seasonTitle, seasonPrices, seasonActions)

  const episodeCard = document.createElement('div')
  episodeCard.className = 'pricingCard'
  episodeCard.setAttribute('aria-label', 'Episode pricing')

  const episodeTitle = document.createElement('div')
  episodeTitle.className = 'pricingCard__title'
  episodeTitle.textContent = 'Per Episode'

  const episodePrices = document.createElement('dl')
  episodePrices.className = 'pricingCard__prices'

  episodePrices.append(
    priceRow('Buy episode', formatMoney(pricing.episode.purchasePrice, currency)),
    ...(pricing.episode.rentalPrice != null ? [priceRow('Rent episode', formatMoney(pricing.episode.rentalPrice, currency))] : [])
  )

  const episodeActions = document.createElement('div')
  episodeActions.className = 'pricingCard__actions'
  episodeActions.append(
    createCTAButton({
      label: 'Browse Episodes',
      variant: 'ghost',
      onClick: () => {
        const el = document.getElementById('episodes')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
      ariaLabel: 'Scroll to episodes grid',
    })
  )

  episodeCard.append(episodeTitle, episodePrices, episodeActions)

  grid.append(seasonCard, episodeCard)
  wrap.append(header, grid)

  return wrap
}

function priceRow(label, value) {
  const row = document.createElement('div')
  row.className = 'pricingRow'

  const dt = document.createElement('dt')
  dt.className = 'pricingRow__label'
  dt.textContent = label

  const dd = document.createElement('dd')
  dd.className = 'pricingRow__value'
  dd.textContent = value

  row.append(dt, dd)
  return row
}

function formatMoney(amount, currency) {
  if (typeof amount !== 'number') return String(amount)
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}
