import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Checkout</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Success</h1>
        <p className="mt-2 text-sm text-brand-gray-700">
          Payment confirmed (placeholder). Webhook will grant entitlements or create orders.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/account" className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white">
            Go to Account
          </Link>
          <Link href="/" className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
