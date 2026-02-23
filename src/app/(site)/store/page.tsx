import Link from 'next/link'
import Image from 'next/image'

export default function StorePage() {
  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-6">
      <h1 className="text-2xl font-[800] tracking-tightish">Store</h1>
      <p className="mt-2 text-sm text-brand-gray-700">Merch store coming soon.</p>

      <div className="mt-5 overflow-hidden rounded border border-brand-gray-200 bg-brand-gray-100">
        <div className="relative h-[60vh] w-full">
          <Image
            src="/merch.png"
            alt="Off Season merch"
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain"
          />
        </div>
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
