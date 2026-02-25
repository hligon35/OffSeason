import Link from 'next/link'
import type { FeedItem, VideoItem } from '@/lib/types/content'
import { Thumb } from '@/components/feed/shared'
import { PlayIcon } from '@/components/ui/Icons'

function isVideo(item: FeedItem): item is VideoItem {
  return item.kind === 'video'
}

export function ClipList({
  title,
  items,
  viewAllHref = '/the-show#clips',
}: {
  title: string
  items: FeedItem[]
  viewAllHref?: string
}) {
  const clips = items.filter(isVideo).slice(0, 4)

  return (
    <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-[800] tracking-tightish">{title}</h2>
        <Link href={viewAllHref} className="text-xs font-[800] uppercase tracking-wide text-brand-gray-700 hover:text-brand-red">
          See all
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {clips.map((clip) => (
          <Link key={clip.id} href={clip.href} className="group rounded border border-brand-gray-200 p-4 hover:border-brand-red">
            <div className="relative mb-3">
              <Thumb label={clip.thumbnailLabel} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-black/70 text-brand-white">
                  <PlayIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 rounded bg-brand-black/80 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">
                {clip.duration}
              </div>
            </div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{clip.category}</div>
            <div className="mt-1 text-base font-[800] tracking-tightish text-brand-black group-hover:text-brand-red">{clip.title}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
