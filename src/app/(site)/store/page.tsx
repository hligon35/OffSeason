import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Official Off Season store. Merch drops and limited releases—stay loud.',
  keywords: ['Off Season merch', 'streetwear', 'limited drops', 'sports culture merch'],
  alternates: { canonical: '/store' },
  openGraph: {
    title: 'Store | Off Season',
    description: 'Official Off Season store. Merch drops and limited releases.',
    url: '/store',
    images: [{ url: '/merch.png' }],
  },
  twitter: {
    title: 'Store | Off Season',
    description: 'Official Off Season store. Merch drops and limited releases.',
    images: ['/merch.png'],
  },
}

export default function StorePage() {
  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-6">
      <h1 className="text-2xl font-[800] tracking-tightish">Store</h1>
      <p className="mt-2 text-sm text-brand-gray-700">Merch drops coming soon. Stay loud.</p>

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
