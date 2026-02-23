'use client'

import * as React from 'react'

export function usePlaybackUrl(episodeId: string | null, productId: string | null) {
  const [url, setUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const load = React.useCallback(async () => {
    if (!episodeId || !productId) return
    setLoading(true)
    setError(null)
    setUrl(null)

    try {
      const res = await fetch(`/api/playback-url?episodeId=${encodeURIComponent(episodeId)}&productId=${encodeURIComponent(productId)}`)
      if (!res.ok) throw new Error(await res.text())
      const data = (await res.json()) as { url: string }
      setUrl(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load playback url')
    } finally {
      setLoading(false)
    }
  }, [episodeId, productId])

  return { url, loading, error, load }
}
