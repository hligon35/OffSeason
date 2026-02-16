import Link from 'next/link'

export default function StorePage() {
  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-6">
      <h1 className="text-2xl font-[800] tracking-tightish">Store</h1>
      <p className="mt-2 text-sm text-brand-gray-700">
        Placeholder storefront. Merch modules and checkout come later.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {['Hoodie', 'Hat', 'Tee'].map((p) => (
          <div key={p} className="rounded border border-brand-gray-200 p-4">
            <div className="aspect-square w-full rounded bg-brand-gray-100" />
            <div className="mt-3 text-sm font-[800]">{p}</div>
            <div className="text-xs text-brand-gray-600">Coming soon</div>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex rounded bg-brand-black px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-gray-900"
      >
        Back to feed
      </Link>
    </div>
  )
}
