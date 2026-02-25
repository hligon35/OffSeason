export const brandCopy = {
  name: 'Off Season',
  tagline: 'Beyond The Pylons',
  about: `Off Season is a premium athlete-led media brand that documents how elite performers train, recover, and build between seasons — because in a world of instant gratification, the off season is what separates the average from the great.

The season is the headline. The offseason is the story — training blocks, rehab rooms, family routines, and the meetings where contracts and careers take shape. We document it with a cinematic eye and a deliberate pace: behavior over slogans, context over hype.

Each season releases in weekly episodes and resolves as a premium film. The Standard stays the same every year: Body. Mind. Ownership.`,
} as const

export const showCopy = {
  title: 'The Show',
  headline: 'Off Season: Beyond The Pylons',
  description:
    'A weekly series tracking the NFL offseason — training, recovery, business, and the quiet decisions that shape a season.',
  ctaLabel: 'Watch episodes',
  ctaHref: '/the-show#episodes',
} as const

export const podcastCopy = {
  title: 'The Podcast',
  headline: 'Off Season Podcast',
  description:
    'Long-form conversations and close reads: recaps, interviews, and the context that doesn’t fit in a clip.',
  ctaLabel: 'Listen',
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
    bio: 'Sets the pace, keeps the room honest, and lets the moment speak before the take does.',
  },
  {
    name: 'Jules',
    role: 'Co-host',
    bio: 'Cuts through the noise with clean breakdowns and a steady point of view.',
  },
] as const

export const podcastSubscribeLinks = [
  { label: 'Apple Podcasts', href: '/' },
  { label: 'Spotify', href: '/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@OffSeasonLive' },
] as const
