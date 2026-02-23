'use client'

import { usePlaybackUrl } from '@/hooks/usePlaybackUrl'

export function EpisodePlayer(props: { episodeId: string; productId: string }) {
  const { url, loading, error, load } = usePlaybackUrl(props.episodeId, props.productId)

  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-4">
      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Player</div>

      <button
        type="button"
        onClick={() => load()}
        className="mt-3 rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
      >
        {loading ? 'Loading…' : 'Get signed playback URL'}
      </button>

      {error ? <div className="mt-3 text-sm text-brand-red">{error}</div> : null}

      {url ? (
        <div className="mt-4">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Signed URL</div>
          <div className="mt-2 break-all rounded border border-brand-gray-200 bg-brand-gray-50 p-3 text-xs">{url}</div>
        </div>
      ) : null}
    </div>
  )
}
