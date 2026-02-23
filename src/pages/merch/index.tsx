import { MerchCard } from '@/components/merch/MerchCard'
import { PRODUCTS } from '@/lib/products/catalog'
import Head from 'next/head'

export default function MerchIndexPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/merch`

  const merch = PRODUCTS.filter((p) => p.kind === 'physical')

  return (
    <>
      <Head>
        <title>Merch | Off Season</title>
        <meta name="description" content="Shop Off Season merch drops and limited releases." />
        <meta name="keywords" content="Off Season merch, drops, streetwear, sports culture" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Merch | Off Season" />
        <meta property="og:description" content="Shop merch drops and limited releases." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Merch | Off Season" />
        <meta name="twitter:description" content="Shop merch drops and limited releases." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
      </Head>

      <div className="mx-auto w-full max-w-4xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Merch</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Shop</h1>
          <p className="mt-2 text-sm text-brand-gray-700">Gear for the Off Season.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {merch.map((p) => (
            <MerchCard key={p.productId} title={p.title} href={`/merch/${p.productId}`} />
          ))}
        </div>
      </div>
    </>
  )
}
