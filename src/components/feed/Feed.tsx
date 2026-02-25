'use client'

import * as React from 'react'
import type { FeedItem } from '@/lib/types/content'
import { getMockFeedPage } from '@/lib/mock/content'
import { PostCard } from '@/components/feed/PostCard'
import { VideoCard } from '@/components/feed/VideoCard'
import { FeaturedBlock } from '@/components/feed/FeaturedBlock'

export function Feed({ scope }: { scope: 'home' | 'episodes' | 'clips' | 'personalities' | `topic:${string}` }) {
  const [page, setPage] = React.useState(0)
  const [items, setItems] = React.useState<FeedItem[]>(() => getMockFeedPage({ scope, page: 0 }).items)
  const [loading, setLoading] = React.useState(false)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  const loadMore = React.useCallback(() => {
    if (loading) return
    setLoading(true)
    const nextPage = page + 1
    const next = getMockFeedPage({ scope, page: nextPage }).items
    window.setTimeout(() => {
      setItems((prev) => [...prev, ...next])
      setPage(nextPage)
      setLoading(false)
    }, 450)
  }, [loading, page, scope])

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
        if (item.kind === 'video') return <VideoCard key={item.id} item={item} />
        return <PostCard key={item.id} item={item} />
      })}

      <div ref={sentinelRef} className="h-10" />

      <div className="py-4 text-center text-xs font-[800] uppercase tracking-wide text-brand-gray-500">
        {loading ? 'Loading more…' : 'More below'}
      </div>
    </div>
  )
}
