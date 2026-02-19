import { CTAButton } from '@/components/ui/CTAButton'
import { brandCopy } from '@/lib/mock/brand'

export function BrandHero() {
  return (
    <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-black text-brand-white">
      <div className="relative px-5 py-10 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-gray-900 to-brand-black" />
        <div className="relative">
          <h1 className="text-3xl font-[800] tracking-tightish sm:text-4xl">{brandCopy.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-brand-white/80 sm:text-base">{brandCopy.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CTAButton href="/the-show" variant="primary">
              Explore the show
            </CTAButton>
            <CTAButton href="/podcast" variant="outline" className="border-brand-white/20 bg-transparent text-brand-white hover:bg-brand-white hover:text-brand-black">
              Explore the podcast
            </CTAButton>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { k: 'Episodes', v: 'Full show feed' },
              { k: 'Clips', v: 'Short-form video' },
              { k: 'Topics', v: 'Verticals + moments' },
            ].map((s) => (
              <div key={s.k} className="rounded border border-brand-white/10 bg-brand-white/5 p-4">
                <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/80">{s.k}</div>
                <div className="mt-1 text-sm text-brand-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
