import Link from 'next/link'
import { Feed } from '@/components/feed/Feed'

const personalities = ['Coach V', 'Rico', 'Jules', 'Mack', 'The Locker Room']

export default function PersonalitiesPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-[800] tracking-tightish">Personalities</h1>
      <p className="mb-4 text-sm text-brand-gray-700">Built on voices. Fueled by opinions.</p>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {personalities.map((p) => (
          <Link
            key={p}
            href={`/topics/${p.toLowerCase().replace(/\s+/g, '-')}`}
            className="rounded border border-brand-gray-200 bg-brand-white p-3 text-sm font-[800] hover:border-brand-red"
          >
            {p}
          </Link>
        ))}
      </div>

      <Feed scope="personalities" />
    </div>
  )
}
