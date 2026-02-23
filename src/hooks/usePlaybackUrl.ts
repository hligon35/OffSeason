'use client'

import * as React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getFirebaseIdTokenOrNull } from '@/firebase/client'

export function usePlaybackUrl(episodeId: string | null, productId: string | null) {
  const { user } = useAuth()
  const [url, setUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    if (!episodeId || !productId) return
    if (!user) {
      setError('Sign in to load playback')
      return
    }
    setLoading(true)
    setError(null)
    setUrl(null)

    try {
      const idToken = await getFirebaseIdTokenOrNull()
      const token = idToken || user.userId
      const authedRes = await fetch(
        `/api/playback-url?episodeId=${encodeURIComponent(episodeId)}&productId=${encodeURIComponent(productId)}`,
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
      setError(e instanceof Error ? e.message : 'Failed to load playback url')
    } finally {
      setLoading(false)
    }
  }, [episodeId, productId, user])

  return { url, loading, error, load }
}
