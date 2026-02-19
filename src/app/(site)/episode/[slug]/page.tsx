import Link from 'next/link'
import { getMockEpisode, slugify } from '@/lib/mock/content'
import { PlayIcon } from '@/components/ui/Icons'
import { FilteredFeed } from '@/components/brand/FilteredFeed'

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const episode = getMockEpisode(slug)

  return (
    <div>
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/the-show"
            className="inline-flex rounded px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-red hover:bg-brand-gray-50"
          >
            {episode.category}
          </Link>
          <span className="rounded bg-brand-gray-50 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-gray-700">Episode</span>
        </div>

        <h1 className="mt-2 text-2xl font-[800] tracking-tightish">{episode.title}</h1>
        <div className="mt-2 text-sm text-brand-gray-700">{episode.summary}</div>
        <div className="mt-2 text-xs text-brand-gray-600">By {episode.author} · {new Date(episode.timestampIso).toLocaleDateString()}</div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr,240px]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-brand-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-100 via-brand-gray-50 to-brand-gray-200" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-black/70 text-brand-white">
                <PlayIcon className="h-7 w-7" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 rounded bg-brand-black/80 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">
              {episode.duration}
            </div>
          </div>
          <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
            <div className="text-xs font-[800] uppercase tracking-wide">Up next</div>
            <ul className="mt-3 space-y-2 text-sm">
              {['Postgame chaos', 'Training camp confessions', 'Fan submissions: best of'].map((t) => (
                <li key={t}>
                  <Link href={`/episode/${slugify(t)}`} className="font-[700] hover:text-brand-red">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-[800] tracking-tightish">More episodes</h2>
        <FilteredFeed scope="episodes" allowedKinds={['featured', 'video']} pageSize={8} />
      </div>
    </div>
  )
}
