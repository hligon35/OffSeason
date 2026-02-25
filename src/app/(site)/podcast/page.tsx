import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Off Season Talk',
  description: 'Off Season Talk—news, conversations, and culture. Join the list for launch updates.',
  keywords: ['Off Season Talk', 'sports podcast', 'sports culture podcast', 'athlete conversations'],
  alternates: { canonical: '/podcast' },
  openGraph: {
    title: 'Off Season Talk | Off Season',
    description: 'News, conversations, and culture. Join the list for launch updates.',
    url: '/podcast',
    images: [{ url: '/The Podcast.png' }],
  },
  twitter: {
    title: 'Off Season Talk | Off Season',
    description: 'News, conversations, and culture. Join the list for launch updates.',
    images: ['/The Podcast.png'],
  },
}

export default function PodcastPage() {
  return (
    <div className="space-y-6">
      <h1 className="sr-only">Off Season Talk</h1>
      <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-black">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/The Podcast.png"
            alt="Off Season Talk"
            fill
            sizes="(min-width: 1024px) 1280px, 100vw"
            className="object-contain"
            priority
          />
        </div>
      </section>

      <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Off Season Talk</div>
        <p className="mt-3 max-w-2xl text-sm text-brand-gray-700 sm:text-base">
          The podcast is in the edit. Join the list and we’ll signal when it drops.
        </p>

        <form className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="email"
            aria-label="Email address"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm text-brand-black outline-none placeholder:text-brand-gray-400 focus:border-brand-red"
          />
          <button
            type="button"
            className="shrink-0 rounded bg-brand-red px-4 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
          >
            Join the list
          </button>
        </form>

        <div className="mt-2 text-xs text-brand-gray-600">No noise. Just release notes.</div>
      </section>

      {/*
        Original podcast page body (kept for later use)

        import { getMockFeedPage } from '@/lib/mock/content'
        import { PodcastHero } from '@/components/brand/PodcastHero'
        import { EpisodeList } from '@/components/brand/EpisodeList'
        import { HostCard } from '@/components/brand/HostCard'
        import { CTAButton } from '@/components/ui/CTAButton'
        import { podcastHosts, podcastSubscribeLinks } from '@/lib/mock/brand'

        const latest = getMockFeedPage({ scope: 'episodes', page: 0, pageSize: 10 }).items

        <PodcastHero />
        ...episodes, hosts, and subscribe sections...
      */}
    </div>
  )
}
