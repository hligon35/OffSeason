import Link from 'next/link'
import type { VideoItem } from '@/lib/types/content'
import { CategoryTag, EngagementRow, MetaLine, Thumb } from '@/components/feed/shared'
import { PlayIcon } from '@/components/ui/Icons'
import { slugify } from '@/lib/mock/content'

export function VideoCard({ item }: { item: VideoItem }) {
  return (
    <article className="rounded border border-brand-gray-200 bg-brand-white p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[240px,1fr]">
        <div className="relative">
          <Thumb label={item.thumbnailLabel} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-black/70 text-brand-white">
              <PlayIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 rounded bg-brand-black/80 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">
            {item.duration}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryTag category={item.category} href={`/topics/${slugify(item.category)}`} />
            <span className="rounded bg-brand-gray-50 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-gray-700">Video</span>
          </div>

          <Link href={item.href} className="mt-2 block">
            <h2 className="text-lg font-[800] tracking-tightish text-brand-black hover:text-brand-red">{item.title}</h2>
          </Link>

          <div className="mt-2">
            <MetaLine author={item.author} timestamp={item.timestampIso} />
          </div>

          <EngagementRow engagement={item.engagement} />
        </div>
      </div>
    </article>
  )
}
