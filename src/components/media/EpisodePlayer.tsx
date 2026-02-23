'use client'

import * as React from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { usePlaybackUrl } from '@/hooks/usePlaybackUrl'
import { useAuth } from '@/hooks/useAuth'

export function EpisodePlayer(props: {
  episodeId: string
  productId: string
  episodeTitle: string
  seasonNumber?: number
  episodeNumber?: number
  posterSrc?: string
}) {
  const { user } = useAuth()
  const { url, loading, error, load } = usePlaybackUrl(props.episodeId, props.productId)

  const envKey = process.env.NEXT_PUBLIC_MUX_DATA_ENV_KEY

  const metadata = React.useMemo(
    () => ({
      video_id: props.episodeId,
      video_title:
        props.episodeNumber != null
          ? `Episode ${props.episodeNumber} • ${props.episodeTitle}`
          : props.episodeTitle,
      video_series: 'Off Season',
      video_stream_type: 'on-demand',
      viewer_user_id: user?.userId,
      custom_1: props.productId,
      custom_2: props.seasonNumber != null ? String(props.seasonNumber) : undefined,
      custom_3: props.episodeNumber != null ? String(props.episodeNumber) : undefined,
    }),
    [props.episodeId, props.episodeNumber, props.episodeTitle, props.productId, props.seasonNumber, user?.userId]
  )

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
          <MuxPlayer
            className="w-full"
            style={{ aspectRatio: '16 / 9' }}
            src={url}
            streamType="on-demand"
            envKey={envKey}
            metadata={metadata}
            title={props.episodeTitle}
            poster={props.posterSrc ?? ''}
            playsInline
          />
        </div>
      ) : null}
    </div>
  )
}
