export const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'The Off Season',
    links: [
      { label: 'Home', href: '/' },
      { label: 'The Show', href: '/the-show' },
      { label: 'The Podcast', href: '/podcast' },
      { label: 'Store', href: '/store' },
    ],
  },
]

export const socialLinks = [
  { label: 'X', href: '/' },
  { label: 'Instagram', href: '/' },
  { label: 'TikTok', href: '/' },
  { label: 'YouTube', href: '/' },
] as const
