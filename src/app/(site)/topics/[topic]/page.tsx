import { redirect } from 'next/navigation'

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  await params
  redirect('/the-show')
  return null
}
