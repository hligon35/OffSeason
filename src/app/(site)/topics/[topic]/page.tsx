import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const topicLabel = topic ? decodeURIComponent(topic).replace(/-/g, ' ') : 'Topic'
  return {
    title: `${topicLabel}`,
    description: `Browse Off Season coverage for ${topicLabel}.`,
    alternates: { canonical: `/topics/${encodeURIComponent(topic)}` },
  }
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  await params
  redirect('/the-show')
  return null
}
