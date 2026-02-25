'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'

type Mode = 'sign-in' | 'create'

export function EmailPasswordAuth() {
  const { signInWithEmailPassword, createAccountWithEmailPassword, sendPasswordReset } = useAuth()

  const [mode, setMode] = React.useState<Mode>('sign-in')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async () => {
    setSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const e = email.trim()
      if (!e) throw new Error('Enter an email address')
      if (!password.trim()) throw new Error('Enter a password')

      if (mode === 'create') {
        await createAccountWithEmailPassword(e, password)
        setMessage('Account created. You’re signed in.')
      } else {
        await signInWithEmailPassword(e, password)
        setMessage('Signed in.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const onReset = async () => {
    setSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const e = email.trim()
      if (!e) throw new Error('Enter your email first.')
      await sendPasswordReset(e)
      setMessage('Password reset sent (if the account exists).')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-4">
      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">
        {mode === 'create' ? 'Create account' : 'Email'}
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <label className="block text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm outline-none placeholder:text-brand-gray-500 focus:border-brand-red"
          />
        </div>

        <div>
          <label className="block text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-2 w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm outline-none placeholder:text-brand-gray-500 focus:border-brand-red"
          />
        </div>

        {error ? <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-3 text-sm text-brand-black">{error}</div> : null}
        {message ? (
          <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-3 text-sm text-brand-gray-700">{message}</div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className={`w-full rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-black ${
              submitting ? 'opacity-60' : ''
            }`}
          >
            {mode === 'create' ? 'Create account' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={submitting}
            className={`w-full rounded border border-brand-gray-200 bg-brand-white px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black hover:border-brand-red ${
              submitting ? 'opacity-60' : ''
            }`}
          >
            Reset password
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          {mode === 'create' ? (
            <button type="button" onClick={() => setMode('sign-in')} className="text-brand-gray-700 hover:text-brand-red">
              Already have an account? Sign in.
            </button>
          ) : (
            <button type="button" onClick={() => setMode('create')} className="text-brand-gray-700 hover:text-brand-red">
              New here? Create an account.
            </button>
          )}
          <div className="text-xs text-brand-gray-600">Prefer Google or Apple? Use the buttons below.</div>
        </div>
      </div>
    </div>
  )
}
