'use client'

import * as React from 'react'
import type { Entitlement } from '@/lib/types/entitlements'
import { useAuth } from '@/hooks/useAuth'
import { getFirebaseIdTokenOrNull } from '@/firebase/client'

export function useEntitlements() {
  const { user } = useAuth()
  const [entitlements, setEntitlements] = React.useState<Entitlement[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!user) {
      setEntitlements([])
      return
    }

    let cancelled = false
    setLoading(true)

    Promise.resolve()
      .then(async () => {
        const idToken = await getFirebaseIdTokenOrNull()
        return idToken || user.userId
      })
      .then((token) =>
        fetch('/api/entitlements', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return (await r.json()) as { entitlements: Entitlement[] }
      })
      .then((data) => {
        if (cancelled) return
        setEntitlements(data.entitlements ?? [])
      })
      .catch(() => {
        if (cancelled) return
        setEntitlements([])
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  return { entitlements, loading }
}
