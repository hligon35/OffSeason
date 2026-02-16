export const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Shows',
    links: [
      { label: 'Episodes', href: '/episodes' },
      { label: 'Clips', href: '/clips' },
      { label: 'Personalities', href: '/personalities' },
      { label: 'Topics', href: '/topics/hot-takes' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Press', href: '/' },
      { label: 'Contact', href: '/' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Fan Submissions', href: '/topics/fan-submissions' },
      { label: 'Newsletter', href: '/' },
      { label: 'Merch', href: '/store' },
      { label: 'Guidelines', href: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/' },
      { label: 'Privacy', href: '/' },
      { label: 'Cookies', href: '/' },
      { label: 'Do Not Sell', href: '/' },
    ],
  },
]

export const socialLinks = [
  { label: 'X', href: '/' },
  { label: 'Instagram', href: '/' },
  { label: 'TikTok', href: '/' },
  { label: 'YouTube', href: '/' },
] as const
