import { CTAButton } from '@/components/ui/CTAButton'
import { podcastCopy } from '@/lib/mock/brand'
import Image from 'next/image'

export function PodcastHero() {
  return (
    <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
      <div className="px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{podcastCopy.title}</div>
            <h1 className="mt-1 text-3xl font-[800] tracking-tightish sm:text-4xl">{podcastCopy.headline}</h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-gray-700 sm:text-base">{podcastCopy.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CTAButton href="/podcast#episodes" variant="primary">
                {podcastCopy.ctaLabel}
              </CTAButton>
              <CTAButton href="/the-show#clips" variant="outline">Watch clips</CTAButton>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-brand-black">
              <Image
                src="/The Podcast.png"
                alt="Off Season Talk"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
