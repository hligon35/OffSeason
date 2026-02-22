import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
        <div className="border-b border-brand-gray-200 bg-brand-black px-5 py-5 text-brand-white">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Account</div>
          <h1 className="mt-1 text-2xl font-[800] tracking-tightish">Sign in to Off Season</h1>
          <p className="mt-2 text-sm text-brand-white/75">Placeholder auth UI — connect real auth later.</p>
        </div>

        <div className="p-5 sm:p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@domain.com"
                className="mt-2 w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm outline-none placeholder:text-brand-gray-500 focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm outline-none placeholder:text-brand-gray-500 focus:border-brand-red"
              />
            </div>

            <button
              type="button"
              className="w-full rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-black"
            >
              Sign In
            </button>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <Link href="/" className="text-brand-gray-700 hover:text-brand-red">
                Back to Home
              </Link>
              <Link href="/" className="text-brand-gray-700 hover:text-brand-red">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-6 rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-black">No account yet?</div>
            <p className="mt-2 text-sm text-brand-gray-700">Placeholder — sign up flow can be added later.</p>
            <button
              type="button"
              className="mt-4 inline-flex rounded border border-brand-gray-200 bg-brand-white px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black hover:border-brand-red"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
