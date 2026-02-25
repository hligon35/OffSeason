import Link from 'next/link'
import Head from 'next/head'
import { startStripeCheckout } from '@/lib/stripe/client'

export default function MerchProductPage() {
  const productId = 'merch_hoodie_black'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/merch/${encodeURIComponent(productId)}`

  return (
    <>
      <Head>
        <title>{`${productId} | Off Season`}</title>
        <meta name="description" content="Off Season merch drop. Limited releases and physical orders." />
        <meta name="keywords" content="Off Season merch, drops, streetwear, sports culture" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${productId} | Off Season`} />
        <meta property="og:description" content="Limited merch releases from Off Season." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${productId} | Off Season`} />
        <meta name="twitter:description" content="Limited merch releases from Off Season." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
      </Head>

      <div className="mx-auto w-full max-w-2xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Product</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">{productId}</h1>
          <p className="mt-2 text-sm text-brand-gray-700">Physical item. Shipping details are provided at checkout.</p>

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
    </>
  )
}
