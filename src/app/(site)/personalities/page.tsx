import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personalities',
  description: 'Meet the cast and creators behind Off Season.',
  alternates: { canonical: '/personalities' },
}

export default function PersonalitiesPage() {
  redirect('/the-show#cast')
  return null
}
