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
  { label: 'TikTok', href: 'https://www.tiktok.com/@offseasonlive' },
  { label: 'X', href: 'https://x.com/offseasonofc' },
  { label: 'YouTube', href: 'https://www.youtube.com/@OffSeasonLive' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/off-season-tv/?viewAsMember=true' },
  { label: 'Instagram', href: 'https://www.instagram.com/offseasonofc/?next=%2F' },
] as const
