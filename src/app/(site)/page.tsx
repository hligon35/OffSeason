import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getMockFeedPage } from '@/lib/mock/content'
import { AboutSection } from '@/components/brand/AboutSection'
import { EpisodeList } from '@/components/brand/EpisodeList'
import { CTAButton } from '@/components/ui/CTAButton'
import { brandCopy } from '@/lib/mock/brand'
import { socialLinks } from '@/lib/mock/links'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Off Season is bold sports + culture—full episodes, clips, and behind-the-scenes from the people in it.',
  keywords: [
    'Off Season',
    'sports culture',
    'full episodes',
    'sports clips',
    'behind the scenes',
    'athlete stories',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Off Season',
    description: 'Bold sports + culture—full episodes, clips, and behind-the-scenes.',
    url: '/',
    images: [{ url: '/offseasonlogo.png' }],
  },
  twitter: {
    title: 'Off Season',
    description: 'Bold sports + culture—full episodes, clips, and behind-the-scenes.',
    images: ['/offseasonlogo.png'],
  },
}

export default function HomePage() {
  const latestEpisodes = getMockFeedPage({ scope: 'episodes', page: 0, pageSize: 10 }).items

  return (
    <div className="space-y-6">
      <h1 className="sr-only">Off Season</h1>
      <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-black">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/offseasonlogo.png"
            alt="Off Season"
            fill
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-contain p-10 sm:p-16"
            priority
          />
        </div>
      </section>

      <AboutSection title="A sports-culture institution" body={brandCopy.about} />

      <EpisodeList title="Latest episodes" items={latestEpisodes} viewAllHref="/the-show#episodes" />

      <section className="rounded border border-brand-gray-200 bg-brand-black p-6 text-brand-white">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">Social</div>
        <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Follow the work</h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-white/75">
          Clips, context, and the moments between episodes — wherever you scroll.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-brand-white/15 px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white/85 hover:border-brand-red hover:text-brand-white"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <CTAButton href="/the-show#episodes" variant="primary">
            Watch episodes
          </CTAButton>
          <CTAButton href="/the-show#clips" variant="outline" className="border-brand-white/20 bg-transparent text-brand-white hover:bg-brand-white hover:text-brand-black">
            Watch clips
          </CTAButton>
        </div>
      </section>
    </div>
  )
}
