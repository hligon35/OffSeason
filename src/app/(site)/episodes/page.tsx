import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Watch full Off Season episodes from the show page.',
  alternates: { canonical: '/episodes' },
}

export default function EpisodesPage() {
  redirect('/the-show#episodes')
  return null
}
