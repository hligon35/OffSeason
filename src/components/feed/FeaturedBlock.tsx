import Link from 'next/link'
import type { FeaturedItem } from '@/lib/types/content'
import { CategoryTag, EngagementRow, MetaLine, Thumb } from '@/components/feed/shared'
import { slugify } from '@/lib/mock/content'

export function FeaturedBlock({ item }: { item: FeaturedItem }) {
  return (
    <article className="rounded border border-brand-gray-200 bg-brand-white">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr,1fr]">
        <div className="p-4">
          <Thumb label={item.thumbnailLabel} />
        </div>
        <div className="p-5 lg:pl-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-brand-red px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">Featured</span>
            <CategoryTag category={item.category} href={`/topics/${slugify(item.category)}`} />
          </div>

          <Link href={item.href} className="mt-3 block">
            <h2 className="text-xl font-[800] tracking-tightish text-brand-black hover:text-brand-red">{item.title}</h2>
          </Link>
          <p className="mt-2 text-sm text-brand-gray-700">{item.dek}</p>

          <div className="mt-3">
            <MetaLine author={item.author} timestamp={item.timestampIso} />
          </div>
          <EngagementRow engagement={item.engagement} />
        </div>
      </div>
    </article>
  )
}
