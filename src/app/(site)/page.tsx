import { Feed } from '@/components/feed/Feed'

export default function HomePage() {
  return (
    <div>
      <div className="mb-4 rounded border border-brand-gray-200 bg-brand-white p-4">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">The Off Season</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">The loudest feed in sports + culture</h1>
        <p className="mt-2 text-sm text-brand-gray-700">
          Sticky takes, fast clips, and personality-driven chaos — built for scrolling.
        </p>
      </div>

      <Feed scope="home" />
    </div>
  )
}
