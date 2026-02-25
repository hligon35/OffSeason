import Link from 'next/link'
import type { Metadata } from 'next'
import { LoginButtons } from '@/components/auth/LoginButtons'
import { EmailPasswordAuth } from '@/components/auth/EmailPasswordAuth'
import { DevSignIn } from '@/components/auth/DevSignIn'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to Off Season to access your purchases, entitlements, and account settings.',
  keywords: ['Off Season sign in', 'account login', 'purchase access'],
  alternates: { canonical: '/sign-in' },
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
        <div className="border-b border-brand-gray-200 bg-brand-black px-5 py-5 text-brand-white">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Account</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Sign in</h1>
          <p className="mt-2 text-sm text-brand-white/75">Use Google, Apple, or email to open your library.</p>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <EmailPasswordAuth />

          <LoginButtons />

          {process.env.NODE_ENV === 'development' ? <DevSignIn /> : null}

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <Link href="/" className="text-brand-gray-700 hover:text-brand-red">
              Back to home
            </Link>
            <Link href="/account" className="text-brand-gray-700 hover:text-brand-red">
              Go to account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
