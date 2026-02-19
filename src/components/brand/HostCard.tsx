import Link from 'next/link'

export function HostCard({
  name,
  role,
  bio,
}: {
  name: string
  role: string
  bio: string
}) {
  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{role}</div>
          <div className="mt-1 text-lg font-[800] tracking-tightish">{name}</div>
        </div>
        <Link
          href="/the-show#cast"
          className="text-xs font-[800] uppercase tracking-wide text-brand-gray-700 hover:text-brand-red"
        >
          More
        </Link>
      </div>
      <p className="mt-3 text-sm text-brand-gray-700">{bio}</p>
    </div>
  )
}
