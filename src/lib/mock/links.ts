export const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Off Season',
    links: [
      { label: 'The Brand', href: '/' },
      { label: 'Off Season TV', href: '/the-show' },
      { label: 'Off Season Talk', href: '/podcast' },
      { label: 'Forums', href: '/forums' },
      { label: 'Merch', href: '/merch' },
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
