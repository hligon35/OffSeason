import Link from 'next/link'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { LoginButtons } from '@/components/auth/LoginButtons'
import { DevSignIn } from '@/components/auth/DevSignIn'

export default function LoginPage() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
