import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { getSiteUrl, getSiteOrigin } from '@/lib/siteUrl'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Off Season',
    template: '%s | Off Season',
  },
  description: 'Bold sports + culture. All personality. All season.',
  keywords: [
    'Off Season',
    'sports culture',
    'sports media',
    'athlete stories',
    'training camp',
    'behind the scenes',
    'video podcast',
    'episodes',
    'clips',
  ],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Off Season',
    title: 'Off Season',
    description: 'Bold sports + culture. All personality. All season.',
    images: [{ url: '/offseasonlogo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'Off Season',
    description: 'Bold sports + culture. All personality. All season.',
    images: ['/offseasonlogo.png'],
  },
  other: {
    // (X-UA-Compatible is obsolete; prefer modern evergreen browsers)
    referrer: 'strict-origin-when-cross-origin',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const origin = getSiteOrigin()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Off Season',
    url: origin,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${origin}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const orgStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Off Season',
    url: origin,
    logo: `${origin}/offseasonlogo.png`,
  }

  return (
    <html lang="en">
      <body className="min-h-screen min-h-dvh antialiased">
        <Script id="ld-json-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <Script id="ld-json-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(orgStructuredData)}
        </Script>
        {children}
      </body>
    </html>
  )
}
