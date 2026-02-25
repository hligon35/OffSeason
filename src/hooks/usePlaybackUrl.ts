'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getFirebaseIdTokenOrNull } from '@/firebase/client'

export function usePlaybackUrl(episodeId: string | null, productIds: string[] | null) {
  const { user } = useAuth()
  const [url, setUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    if (!episodeId || !productIds || productIds.length === 0) return
    if (!user) {
      setError('Sign in to watch.')
      return
    }
    setLoading(true)
    setError(null)
    setUrl(null)

    try {
      const idToken = await getFirebaseIdTokenOrNull()
      const token = idToken || user.userId
      const authedRes = await fetch(
        `/api/playback-url?episodeId=${encodeURIComponent(episodeId)}&productIds=${encodeURIComponent(productIds.join(','))}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!authedRes.ok) throw new Error(await authedRes.text())
      const data = (await authedRes.json()) as { url: string }
      setUrl(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Couldn’t load playback.')
    } finally {
      setLoading(false)
    }
  }, [episodeId, productIds, user])

  return { url, loading, error, load }
}
