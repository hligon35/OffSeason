import Link from 'next/link'
import Head from 'next/head'

export default function CheckoutSuccessPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/checkout/success`

  return (
    <>
      <Head>
        <title>Purchase Confirmed | Off Season</title>
        <meta name="description" content="Your Off Season purchase is confirmed. Head to your account to view access." />
        <meta name="keywords" content="Off Season checkout success, purchase confirmed, entitlements" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Purchase Confirmed | Off Season" />
        <meta property="og:description" content="Your purchase is confirmed. View access in your account." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Purchase Confirmed | Off Season" />
        <meta name="twitter:description" content="Your purchase is confirmed. View access in your account." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mx-auto w-full max-w-xl">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Checkout</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Success</h1>
          <p className="mt-2 text-sm text-brand-gray-700">
            Payment confirmed. We’ll unlock your access as the webhook finalizes your order.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/account"
              className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
            >
              Go to Account
            </Link>
            <Link
              href="/"
              className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
