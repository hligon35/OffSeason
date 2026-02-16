import { Feed } from '@/components/feed/Feed'

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const label = topic.replace(/-/g, ' ')
  return (
    <div>
      <h1 className="mb-2 text-2xl font-[800] tracking-tightish">Topic: {label}</h1>
      <p className="mb-4 text-sm text-brand-gray-700">A feed slice dedicated to the moment.</p>
      <Feed scope={`topic:${topic}`} />
    </div>
  )
}
