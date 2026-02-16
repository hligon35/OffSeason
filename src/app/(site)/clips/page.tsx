import { Feed } from '@/components/feed/Feed'

export default function ClipsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-[800] tracking-tightish">Clips</h1>
      <Feed scope="clips" />
    </div>
  )
}
