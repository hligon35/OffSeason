import Link from 'next/link'
import { startStripeCheckout } from '@/lib/stripe/client'

export default function MerchProductPage() {
  const productId = 'merch_hoodie_black'

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Product</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">{productId}</h1>
        <p className="mt-2 text-sm text-brand-gray-700">Physical orders will be recorded in Firestore.</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => startStripeCheckout(productId)}
            className="rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
          >
            Buy
          </button>
          <Link href="/merch" className="text-sm text-brand-gray-700 hover:text-brand-red">
            Back to merch
          </Link>
        </div>
      </div>
    </div>
  )
}
