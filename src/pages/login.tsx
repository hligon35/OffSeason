import Link from 'next/link'
import Head from 'next/head'
import { LoginButtons } from '@/components/auth/LoginButtons'
import { DevSignIn } from '@/components/auth/DevSignIn'

export default function LoginPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://off-season.io'
  const canonical = `${siteUrl.replace(/\/$/, '')}/login`

  return (
    <>
      <Head>
        <title>Login | Off Season</title>
        <meta name="description" content="Sign in to Off Season to access your account, purchases, and entitlements." />
        <meta name="keywords" content="Off Season login, sign in, account access, purchases, entitlements" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Login | Off Season" />
        <meta property="og:description" content="Sign in to Off Season to access your account, purchases, and entitlements." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Login | Off Season" />
        <meta name="twitter:description" content="Sign in to Off Season to access your account, purchases, and entitlements." />
        <meta name="twitter:image" content={`${siteUrl.replace(/\/$/, '')}/offseasonlogo.png`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mx-auto w-full max-w-xl space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Login</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Sign in to Off Season</h1>
          <p className="mt-2 text-sm text-brand-gray-700">
            Use Google or Apple to access purchases, entitlements, and order history.
          </p>

          <div className="mt-5">
            <LoginButtons />
          </div>

          {process.env.NODE_ENV === 'development' ? (
            <div className="mt-5">
              <DevSignIn />
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
            <Link href="/" className="text-brand-gray-700 hover:text-brand-red">
              Back to Home
            </Link>
            <Link href="/account" className="text-brand-gray-700 hover:text-brand-red">
              Go to Account
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
