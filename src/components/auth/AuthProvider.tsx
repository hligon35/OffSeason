'use client'

import * as React from 'react'
import type { AuthUser } from '@/lib/types/auth'
import { clientAuth } from '@/firebase/client'

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signInWithEmailPassword(email: string, password: string): Promise<void>
  createAccountWithEmailPassword(email: string, password: string): Promise<void>
  sendPasswordReset(email: string): Promise<void>
  signInDev(userId: string, email?: string): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    clientAuth
      .getCurrentUser()
      .then((u) => {
        if (cancelled) return
        setUser(u)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signInWithGoogle: async () => {
        await clientAuth.signInWithGoogle()
        const next = await clientAuth.getCurrentUser()
        setUser(next)
      },
      signInWithApple: async () => {
        await clientAuth.signInWithApple()
        const next = await clientAuth.getCurrentUser()
        setUser(next)
      },
      signInWithEmailPassword: async (email: string, password: string) => {
        await clientAuth.signInWithEmailPassword(email, password)
        const next = await clientAuth.getCurrentUser()
        setUser(next)
      },
      createAccountWithEmailPassword: async (email: string, password: string) => {
        await clientAuth.createAccountWithEmailPassword(email, password)
        const next = await clientAuth.getCurrentUser()
        setUser(next)
      },
      sendPasswordReset: async (email: string) => {
        await clientAuth.sendPasswordReset(email)
      },
      signInDev: async (userId: string, email?: string) => {
        await clientAuth.signInDev(userId, email)
        const next = await clientAuth.getCurrentUser()
        setUser(next)
      },
      signOut: async () => {
        await clientAuth.signOut()
        setUser(null)
      },
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within <AuthProvider>')
  return ctx
}
