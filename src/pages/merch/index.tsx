import { MerchCard } from '@/components/merch/MerchCard'
import { PRODUCTS } from '@/lib/products/catalog'

export default function MerchIndexPage() {
  const merch = PRODUCTS.filter((p) => p.kind === 'physical')

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Merch</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Shop</h1>
        <p className="mt-2 text-sm text-brand-gray-700">Placeholder merch pages. Wire to Firestore later.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {merch.map((p) => (
          <MerchCard key={p.productId} title={p.title} href={`/merch/${p.productId}`} />
        ))}
      </div>
    </div>
  )
}
