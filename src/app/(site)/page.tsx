import Link from 'next/link'
import { getMockFeedPage } from '@/lib/mock/content'
import { BrandHero } from '@/components/brand/BrandHero'
import { AboutSection } from '@/components/brand/AboutSection'
import { EpisodeList } from '@/components/brand/EpisodeList'
import { CTAButton } from '@/components/ui/CTAButton'
import { brandCopy } from '@/lib/mock/brand'
import { socialLinks } from '@/lib/mock/links'

export default function HomePage() {
  const latestEpisodes = getMockFeedPage({ scope: 'episodes', page: 0, pageSize: 10 }).items

  return (
    <div className="space-y-6">
      <BrandHero />

      <AboutSection title="A brand-first media company" body={brandCopy.about} />

      <EpisodeList title="Latest episodes" items={latestEpisodes} viewAllHref="/the-show#episodes" />

      <section className="rounded border border-brand-gray-200 bg-brand-black p-6 text-brand-white">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Social</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Follow the brand</h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-white/75">
          Clips, updates, and behind-the-scenes moments — wherever you scroll.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded border border-brand-white/15 px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white/85 hover:border-brand-red hover:text-brand-white"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <CTAButton href="/the-show#episodes" variant="primary">
            Browse episodes
          </CTAButton>
          <CTAButton href="/the-show#clips" variant="outline" className="border-brand-white/20 bg-transparent text-brand-white hover:bg-brand-white hover:text-brand-black">
            Browse clips
          </CTAButton>
        </div>
      </section>
    </div>
  )
}
