'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'

export function DevSignIn() {
  const { signInDev } = useAuth()
  const [userId, setUserId] = React.useState('dev_user_123')
  const [email, setEmail] = React.useState('dev@off-season.io')

  return (
    <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Dev sign-in</div>
      <p className="mt-2 text-sm text-brand-gray-700">
        Use a local dev user while Firebase Auth is scaffold-only.
      </p>

      <div className="mt-3 space-y-2">
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm"
          placeholder="dev user id"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm"
          placeholder="dev email (optional)"
        />
        <button
          type="button"
          onClick={async () => {
            const id = userId.trim()
            if (!id) return
            await signInDev(id, email.trim() || undefined)
            window.location.href = '/account'
          }}
          className="w-full rounded bg-brand-black px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
        >
          Continue as dev user
        </button>
      </div>

      <div className="mt-3 text-xs text-brand-gray-600">
        Server APIs require <span className="font-[800]">OFFSEASON_DEV_BYPASS_AUTH=true</span> to accept this userId as a bearer token.
      </div>
    </div>
  )
}
