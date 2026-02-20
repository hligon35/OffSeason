export const brandCopy = {
  name: 'The Off Season',
  tagline: 'Beyond The Pylons',
  about:
    'The Off Season is a media company built around shows, podcasts, and personality-driven storytelling. We cover sports and culture like a group chat: fast, loud, and opinionated — with just enough structure to keep it clean.',
} as const

export const showCopy = {
  title: 'The Show',
  headline: 'The Off Season: the flagship show',
  description:
    'Our main format — segments, debates, and reactions built for video-first viewing. Big takes, bigger energy, and a cast that never lets a moment go quietly.',
  ctaLabel: 'See episodes',
  ctaHref: '/the-show#episodes',
} as const

export const podcastCopy = {
  title: 'The Podcast',
  headline: 'The Off Season Podcast',
  description:
    'A longer-form version of the chaos. Recaps, interviews, and deep dives — designed for commutes, workouts, and late-night “one more segment.”',
  ctaLabel: 'Listen to full episodes',
  ctaHref: '/podcast',
} as const

export const showCast = [
  { name: 'Coach V', role: 'Host' },
  { name: 'Rico', role: 'Co-host' },
  { name: 'Jules', role: 'Analyst' },
  { name: 'Mack', role: 'Producer' },
  { name: 'The Locker Room', role: 'Roundtable' },
] as const

export const podcastHosts = [
  {
    name: 'Coach V',
    role: 'Host',
    bio: 'Guides the room, calls the audibles, and keeps the takes spicy but grounded.',
  },
  {
    name: 'Jules',
    role: 'Co-host',
    bio: 'Cuts through the noise with the cleanest breakdowns and the sharpest one-liners.',
  },
] as const

export const podcastSubscribeLinks = [
  { label: 'Apple Podcasts', href: '/' },
  { label: 'Spotify', href: '/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@OffSeasonLive' },
] as const
