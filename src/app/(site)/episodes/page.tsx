import { Feed } from '@/components/feed/Feed'

export default function EpisodesPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-[800] tracking-tightish">Episodes</h1>
      <Feed scope="episodes" />
    </div>
  )
}
