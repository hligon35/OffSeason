import Link from 'next/link'
import { MediaCard } from '@/components/media/MediaCard'

export default function SeasonPage() {
  // Placeholder: use Next router to read seasonId and load from Firestore.
  const seasonId = 'season1'

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Season</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">{seasonId}</h1>
        <p className="mt-2 text-sm text-brand-gray-700">Episodes are placeholders. Load from Firestore later.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MediaCard title="Episode 1" href={`/media/${seasonId}/s1e1`} />
        <MediaCard title="Episode 2" href={`/media/${seasonId}/s1e2`} />
      </div>

      <Link href="/account" className="text-sm text-brand-gray-700 hover:text-brand-red">
        Back to account
      </Link>
    </div>
  )
}
