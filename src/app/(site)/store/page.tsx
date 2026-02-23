import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Official Off Season store. Merch drops and limited releases—stay loud.',
  keywords: ['Off Season merch', 'streetwear', 'limited drops', 'sports culture merch'],
  alternates: { canonical: '/store' },
  openGraph: {
    title: 'Store | Off Season',
    description: 'Official Off Season store. Merch drops and limited releases.',
    url: '/store',
    images: [{ url: '/merch.png' }],
  },
  twitter: {
    title: 'Store | Off Season',
    description: 'Official Off Season store. Merch drops and limited releases.',
    images: ['/merch.png'],
  },
}

export default function StorePage() {
  notFound()
}
