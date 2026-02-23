import { MediaCard } from '@/components/media/MediaCard'
import { PRODUCTS } from '@/lib/products/catalog'

export default function MediaIndexPage() {
  const mediaProducts = PRODUCTS.filter((p) => p.kind === 'digital')

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Media</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Browse seasons</h1>
        <p className="mt-2 text-sm text-brand-gray-700">Placeholder product pages. Swap to Firestore-backed data later.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mediaProducts.map((p) => (
          <MediaCard key={p.productId} title={p.title} description={p.description} href={`/media/season1`} />
        ))}
      </div>
    </div>
  )
}
