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
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-100 via-brand-gray-50 to-brand-gray-200" />
              <div className="absolute inset-0 flex items-end">
                <div className="m-4 inline-flex rounded bg-brand-black/80 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">
                  The Show
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
