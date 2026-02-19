import { getMockFeedPage } from '@/lib/mock/content'
import { PodcastHero } from '@/components/brand/PodcastHero'
import { EpisodeList } from '@/components/brand/EpisodeList'
import { HostCard } from '@/components/brand/HostCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { podcastHosts, podcastSubscribeLinks } from '@/lib/mock/brand'

export default function PodcastPage() {
  const latest = getMockFeedPage({ scope: 'episodes', page: 0, pageSize: 10 }).items

  return (
    <div className="space-y-6">
      <PodcastHero />

      <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Podcast</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Long-form takes, cleaner breakdowns</h2>
        <p className="mt-3 max-w-3xl text-sm text-brand-gray-700 sm:text-base">
          The podcast is where we slow down: recaps, interviews, and a few segments that deserve more than a clip.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <CTAButton href="#episodes" variant="primary">Browse episodes</CTAButton>
          <CTAButton href="/the-show#clips" variant="outline">Watch clips</CTAButton>
        </div>
      </section>

      <section id="episodes">
        <EpisodeList title="Latest podcast episodes" items={latest} viewAllHref="#episodes" />
      </section>

      <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Hosts</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Meet the voices</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {podcastHosts.map((h) => (
            <HostCard key={h.name} name={h.name} role={h.role} bio={h.bio} />
          ))}
        </div>
      </section>

      <section className="rounded border border-brand-gray-200 bg-brand-black p-6 text-brand-white">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Subscribe</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Listen anywhere</h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-white/75">Placeholder links — connect real URLs when ready.</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {podcastSubscribeLinks.map((l) => (
            <CTAButton
              key={l.label}
              href={l.href}
              variant="outline"
              className="border-brand-white/20 bg-transparent text-brand-white hover:bg-brand-white hover:text-brand-black"
            >
              {l.label}
            </CTAButton>
          ))}
        </div>
      </section>
    </div>
  )
}
