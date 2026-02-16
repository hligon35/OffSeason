import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Off Season',
  description: 'Bold sports + culture. All personality. All season.',
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
