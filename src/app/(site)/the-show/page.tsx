import { getMockFeedPage } from '@/lib/mock/content'
import { ShowHero } from '@/components/brand/ShowHero'
import { ClipList } from '@/components/brand/ClipList'
import { HostCard } from '@/components/brand/HostCard'
import { CTAButton } from '@/components/ui/CTAButton'
import storeData from '@/lib/storefront/storeData.json'
import { VideoStoreEpisodesSection } from '@/components/storefront/VideoStoreEpisodesSection'

export default function TheShowPage() {
  const behindTheScenesClips = getMockFeedPage({ scope: 'topic:behind-the-scenes', page: 0, pageSize: 8 }).items

  const directors = [
    {
      name: 'Tevin Tavares',
      bio: 'Directs Season One — shaping the story, pacing, and tone behind the camera.',
      avatarSrc: '/tevin.jpg',
    },
  ] as const

  const cast = [
    {
      name: 'David Njoku',
      bio: 'Featured in Season One — Episode 1.',
      avatarSrc: '/david.jpg',
    },
    {
      name: 'Penei Sewell',
      bio: 'Featured in Season One — Episode 2.',
      avatarSrc: '/penei.jpg',
    },
    {
      name: 'Trey Hendrickson',
      bio: 'Featured in Season One — Episode 3.',
      avatarSrc: '/trey.jpg',
    },
    {
      name: 'George Kittle',
      bio: 'Featured in Season One — Episode 4.',
      avatarSrc: '/george.jpg',
    },
    {
      name: 'Ricky Pearsall',
      bio: 'Featured in Season One — Episode 5.',
      avatarSrc: '/ricky.jpg',
    },
  ] as const

  return (
    <div className="space-y-6">
      <ShowHero />

      <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,420px]">
          <div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Show description</div>
            <h2 className="mt-1 text-2xl font-[800] tracking-tightish">What Off Season is</h2>
            <p className="mt-3 text-sm text-brand-gray-700 sm:text-base">
              A video-first series built around segments: quick debates, reactions, and “how did this happen?” breakdowns.
              It’s a weekly drop with daily clip energy — made for fans who want the highlights and the heat.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CTAButton href="#episodes" variant="primary">Watch full episodes</CTAButton>
              <CTAButton href="#clips" variant="outline">Watch clips</CTAButton>
            </div>
          </div>

          <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-black">Show verticals</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'Off Season TV',
                'Behind The Scenes',
                'Hot Takes',
                'Training Camp',
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-brand-gray-200 bg-brand-white px-3 py-1 text-xs font-[800] uppercase tracking-wide text-brand-gray-800"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4" id="cast">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Cast</div>
          <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Who you’ll follow in Season One</h2>

          <div className="mt-5">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Directors</div>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {directors.map((p) => (
                <HostCard key={p.name} name={p.name} bio={p.bio} avatarSrc={p.avatarSrc} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Cast</div>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cast.map((p) => (
                <HostCard key={p.name} name={p.name} bio={p.bio} avatarSrc={p.avatarSrc} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoStoreEpisodesSection data={storeData} />

      <section id="clips">
        <ClipList title="Behind-the-scenes" items={behindTheScenesClips} viewAllHref="#clips" />
      </section>

      <section className="rounded border border-brand-gray-200 bg-brand-black p-6 text-brand-white">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Ready to watch?</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Catch the full episodes</h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-white/75">
          The main feed lives in Episodes — clips are great, but the full context is where the best arguments happen.
        </p>
        <div className="mt-4">
          <CTAButton href="#episodes" variant="primary">Go to Episodes</CTAButton>
        </div>
      </section>
    </div>
  )
}
