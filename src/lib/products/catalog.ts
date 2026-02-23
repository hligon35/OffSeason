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
    description: 'Unlock all Season 1 episodes.',
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
