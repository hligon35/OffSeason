import Link from 'next/link'
import type { FeedItem, FeaturedItem, VideoItem } from '@/lib/types/content'
import { Thumb } from '@/components/feed/shared'

type Episodeish = FeaturedItem | VideoItem

function isEpisodeish(item: FeedItem): item is Episodeish {
  return (item.kind === 'featured' || item.kind === 'video') && item.href.startsWith('/episode/')
}

export function EpisodeList({
  title,
  items,
  viewAllHref = '/the-show#episodes',
}: {
  title: string
  items: FeedItem[]
  viewAllHref?: string
}) {
  const episodes = items.filter(isEpisodeish).slice(0, 4)

  return (
    <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-[800] tracking-tightish">{title}</h2>
        <Link href={viewAllHref} className="text-xs font-[800] uppercase tracking-wide text-brand-gray-700 hover:text-brand-red">
          View all
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {episodes.map((ep) => (
          <Link key={ep.id} href={ep.href} className="group rounded border border-brand-gray-200 p-4 hover:border-brand-red">
            <div className="mb-3">
              <Thumb label={ep.thumbnailLabel} />
            </div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{ep.category}</div>
            <div className="mt-1 text-base font-[800] tracking-tightish text-brand-black group-hover:text-brand-red">{ep.title}</div>
            {'duration' in ep ? (
              <div className="mt-1 text-xs text-brand-gray-600">Runtime · {ep.duration}</div>
            ) : (
              <div className="mt-1 text-xs text-brand-gray-600">Featured episode</div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
