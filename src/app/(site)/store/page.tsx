import Link from 'next/link'
import Image from 'next/image'

export default function StorePage() {
  const products = [
    { name: 'Hoodie', imageSrc: '/products/hoodie.png' },
    { name: 'Hat', imageSrc: '/products/hat.png' },
    { name: 'Tee', imageSrc: '/products/tee.png' },
  ] as const

  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-6">
      <h1 className="text-2xl font-[800] tracking-tightish">Store</h1>
      <p className="mt-2 text-sm text-brand-gray-700">
        Placeholder storefront. Merch modules and checkout come later.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="rounded border border-brand-gray-200 p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded bg-brand-gray-100">
              <Image src={p.imageSrc} alt={p.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="mt-3 text-sm font-[800]">{p.name}</div>
            <div className="text-xs text-brand-gray-600">Coming soon</div>
          </div>
        ))}
      </div>
      <Link
        href="/"
        className="mt-6 inline-flex rounded bg-brand-black px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-gray-900"
      >
        Back to Home
      </Link>
    </div>
  )
}
