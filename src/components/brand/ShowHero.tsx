import { CTAButton } from '@/components/ui/CTAButton'
import { showCopy } from '@/lib/mock/brand'

export function ShowHero() {
  return (
    <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-white">
      <div className="px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{showCopy.title}</div>
            <h1 className="mt-1 text-3xl font-[800] tracking-tightish sm:text-4xl">{showCopy.headline}</h1>
            <p className="mt-3 max-w-2xl text-sm text-brand-gray-700 sm:text-base">{showCopy.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CTAButton href={showCopy.ctaHref} variant="primary">
                {showCopy.ctaLabel}
              </CTAButton>
              <CTAButton href="/the-show#clips" variant="outline">
                Watch clips
              </CTAButton>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-brand-gray-100">
              <iframe
                className="absolute inset-0 h-full w-full"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/LquSflkT4x4?autoplay=1&mute=1&loop=1&playlist=LquSflkT4x4&playsinline=1&controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
