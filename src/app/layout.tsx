import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Off Season',
  description: 'Bold sports + culture. All personality. All season.',
  icons: {
    icon: [{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
