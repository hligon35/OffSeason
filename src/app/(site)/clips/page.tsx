import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clips',
  description: 'Watch Off Season clips and behind-the-scenes highlights.',
  alternates: { canonical: '/clips' },
}

export default function ClipsPage() {
  redirect('/the-show#clips')
  return null
}
