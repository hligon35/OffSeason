import Link from 'next/link'

const verticals = [
  { label: 'Off Season TV', href: '/topics/off-season-tv' },
  { label: 'Behind The Scenes', href: '/topics/behind-the-scenes' },
  { label: 'Hot Takes', href: '/topics/hot-takes' },
  { label: 'Training Camp', href: '/topics/training-camp' },
  { label: 'Fan Submissions', href: '/topics/fan-submissions' },
] as const

export function VerticalsNav() {
  return (
    <div className="w-full border-b border-brand-gray-200 bg-brand-white">
      <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {verticals.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="whitespace-nowrap rounded-full border border-brand-gray-200 bg-brand-white px-3 py-1 text-xs font-[800] uppercase tracking-wide text-brand-gray-800 hover:border-brand-red hover:text-brand-black"
            >
              {v.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
