'use client'

import * as React from 'react'
import type { FeedItem, FeaturedItem, VideoItem } from '@/lib/types/content'
import { getMockFeedPage } from '@/lib/mock/content'
import { VideoCard } from '@/components/feed/VideoCard'
import { FeaturedBlock } from '@/components/feed/FeaturedBlock'

type AllowedKind = 'video' | 'featured'

function isAllowed(item: FeedItem, allowedKinds: AllowedKind[]): item is VideoItem | FeaturedItem {
  if (allowedKinds.includes('featured') && item.kind === 'featured') return item.href.startsWith('/episode/')
  if (allowedKinds.includes('video') && item.kind === 'video') return item.href.startsWith('/episode/')
  return false
}

export function FilteredFeed({
  scope,
  allowedKinds,
  pageSize = 12,
}: {
  scope: 'episodes' | 'clips'
  allowedKinds: AllowedKind[]
  pageSize?: number
}) {
  const [page, setPage] = React.useState(0)
  const [items, setItems] = React.useState<Array<VideoItem | FeaturedItem>>(() => {
    const first = getMockFeedPage({ scope, page: 0, pageSize }).items
    return first.filter((i) => isAllowed(i, allowedKinds))
  })
  const [loading, setLoading] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  const loadMore = React.useCallback(() => {
    if (loading) return
    setLoading(true)
    const nextPage = page + 1
    const next = getMockFeedPage({ scope, page: nextPage, pageSize }).items
      .filter((i) => isAllowed(i, allowedKinds))

    window.setTimeout(() => {
      setItems((prev) => [...prev, ...next])
      setPage(nextPage)
      setLoading(false)
    }, 450)
  }, [allowedKinds, loading, page, pageSize, scope])

  React.useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore()
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore])

  return (
    <div className="space-y-4">
      {items.map((item) => {
        if (item.kind === 'featured') return <FeaturedBlock key={item.id} item={item} />
        return <VideoCard key={item.id} item={item} />
      })}

      <div ref={sentinelRef} className="h-10" />

      <div className="py-4 text-center text-xs font-[800] uppercase tracking-wide text-brand-gray-500">
        {loading ? 'Loading more…' : 'More below'}
      </div>
    </div>
  )
}
