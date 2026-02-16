import Link from 'next/link'
import type { PostItem } from '@/lib/types/content'
import { CategoryTag, EngagementRow, MetaLine, Thumb } from '@/components/feed/shared'
import { slugify } from '@/lib/mock/content'

export function PostCard({ item }: { item: PostItem }) {
  return (
    <article className="rounded border border-brand-gray-200 bg-brand-white p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[240px,1fr]">
        <div>
          <Thumb label={item.thumbnailLabel} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryTag category={item.category} href={`/topics/${slugify(item.category)}`} />
          </div>

          <Link href={item.href} className="mt-2 block">
            <h2 className="text-lg font-[800] tracking-tightish text-brand-black hover:text-brand-red">
              {item.title}
            </h2>
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
