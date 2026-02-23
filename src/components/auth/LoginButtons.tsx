'use client'

import * as React from 'react'
import { useAuthContext } from '@/components/auth/AuthProvider'

export function LoginButtons() {
  const { signInWithGoogle, signInWithApple } = useAuthContext()
  const [error, setError] = React.useState<string | null>(null)

  const onGoogle = async () => {
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed'
      setError(msg)
    }
  }

  const onApple = async () => {
    setError(null)
    try {
      await signInWithApple()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed'
      setError(msg)
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onGoogle}
        className="w-full rounded bg-brand-black px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
      >
        Continue with Google
      </button>

      <button
        type="button"
        onClick={onApple}
        className="w-full rounded border border-brand-gray-200 bg-brand-white px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black"
      >
        Continue with Apple
      </button>

      {error ? (
        <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-3 text-sm text-brand-black">
          {error}
          <div className="mt-2 text-xs text-brand-gray-600">
            Common causes: missing <span className="font-[800]">NEXT_PUBLIC_FIREBASE_*</span> env vars (file must be named{' '}
            <span className="font-[800]">.env.local</span>), provider not enabled in Firebase Auth, or popup blocked.
          </div>
        </div>
      ) : null}

      <div className="pt-2 text-xs text-brand-gray-600">
        Auth is scaffold-only right now. Wire Firebase client SDK in <span className="font-[800]">src/firebase/client.ts</span>.
      </div>
    </div>
  )
}
