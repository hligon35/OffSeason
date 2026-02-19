import Link from 'next/link'
import { CTAButton } from '@/components/ui/CTAButton'

export function FeaturedRow({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}) {
  return (
    <section className="rounded border border-brand-gray-200 bg-brand-white">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr,420px]">
        <div className="p-5 sm:p-6">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{eyebrow}</div>
          <h3 className="mt-1 text-xl font-[800] tracking-tightish sm:text-2xl">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-brand-gray-700">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CTAButton href={ctaHref} variant="primary">
              {ctaLabel}
            </CTAButton>
            <Link href={ctaHref} className="text-xs font-[800] uppercase tracking-wide text-brand-gray-700 hover:text-brand-red">
              Learn more
            </Link>
          </div>
        </div>

        <div className="border-t border-brand-gray-200 p-5 lg:border-l lg:border-t-0">
          <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-black">What you get</div>
            <ul className="mt-3 space-y-2 text-sm text-brand-gray-700">
              <li>• Weekly drops and rapid reactions</li>
              <li>• Personality-first segments</li>
              <li>• Clips, episodes, and topic verticals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
