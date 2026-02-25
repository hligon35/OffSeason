export type ProductKind = 'digital' | 'physical'

export type Product = {
  productId: string
  kind: ProductKind
  title: string
  description?: string
  // Stripe Price ID goes here later.
  stripePriceId?: string
}

// Placeholder catalog.
// Swap to Firestore-backed product loading later.
export const PRODUCTS: Product[] = [
  {
    productId: 'media_season1',
    kind: 'digital',
    title: 'Season 1 Pass',
    description: 'Access every Season One episode.',
  },
  {
    productId: 'media_s1e1',
    kind: 'digital',
    title: 'Season 1 • Episode 1',
    description: 'Access Episode 1.',
  },
  {
    productId: 'media_s1e2',
    kind: 'digital',
    title: 'Season 1 • Episode 2',
    description: 'Access Episode 2.',
  },
  {
    productId: 'media_s1e3',
    kind: 'digital',
    title: 'Season 1 • Episode 3',
    description: 'Access Episode 3.',
  },
  {
    productId: 'media_s1e4',
    kind: 'digital',
    title: 'Season 1 • Episode 4',
    description: 'Access Episode 4.',
  },
  {
    productId: 'media_s1e5',
    kind: 'digital',
    title: 'Season 1 • Episode 5',
    description: 'Access Episode 5.',
  },
  {
    productId: 'merch_hoodie_black',
    kind: 'physical',
    title: 'Off Season Hoodie (Black)',
  },
]

export function getProduct(productId: string) {
  return PRODUCTS.find((p) => p.productId === productId) ?? null
}
