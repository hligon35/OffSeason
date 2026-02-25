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
      const msg = err instanceof Error ? err.message : 'Sign-in didn’t work.'
      setError(msg)
    }
  }

  const onApple = async () => {
    setError(null)
    try {
      await signInWithApple()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in didn’t work.'
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
            Common causes: a blocked popup, disabled cookies, or a network interruption.
          </div>
        </div>
      ) : null}

      <div className="pt-2 text-xs text-brand-gray-600">
        If sign-in doesn’t open a window, allow popups and try again.
      </div>
    </div>
  )
}
