export type ForumThread = {
  id: string
  title: string
  author: string
  replies: number
  lastActivity: string
}

export type ForumComment = {
  id: string
  author: string
  body: string
  timestampIso: string
}

export type ForumPost = {
  id: string
  categoryId: string
  categoryTitle: string
  title: string
  author: string
  timestampIso: string
  thumbnailLabel: string
  excerpt: string
  topComments: ForumComment[]
}

export type ForumCategory = {
  id: string
  title: string
  description: string
  threads: ForumThread[]
}

export const forumCategories: ForumCategory[] = [
  {
    id: 'announcements',
    title: 'Announcements',
    description: 'Drops, updates, and what’s new on Off Season.',
    threads: [
      {
        id: 'welcome',
        title: 'Welcome to the Forums',
        author: 'Off Season Team',
        replies: 12,
        lastActivity: 'Today',
      },
      {
        id: 'season-one',
        title: 'Season One rollout schedule',
        author: 'Off Season Team',
        replies: 28,
        lastActivity: 'Yesterday',
      },
    ],
  },
  {
    id: 'episodes',
    title: 'Episodes',
    description: 'Reactions, questions, and behind-the-scenes talk by episode.',
    threads: [
      {
        id: 's1e1-njoku',
        title: 'S1E1 — David Njoku: biggest takeaway?',
        author: 'Rico',
        replies: 44,
        lastActivity: '2d ago',
      },
      {
        id: 's1e4-kittle',
        title: 'S1E4 — George Kittle: training notes',
        author: 'Jules',
        replies: 19,
        lastActivity: '3d ago',
      },
    ],
  },
  {
    id: 'merch',
    title: 'Merch & Drops',
    description: 'Sizing, restocks, shipping, and new drops.',
    threads: [
      {
        id: 'hoodie-sizing',
        title: 'Hoodie sizing: true-to-size?',
        author: 'Mack',
        replies: 8,
        lastActivity: '4d ago',
      },
      {
        id: 'next-drop',
        title: 'Next drop wishlist',
        author: 'The Locker Room',
        replies: 33,
        lastActivity: '1w ago',
      },
    ],
  },
] as const

export const forumTimelinePosts: ForumPost[] = [
  {
    id: 'p-welcome',
    categoryId: 'announcements',
    categoryTitle: 'Announcements',
    title: 'Welcome to the community — what do you want from Forums?',
    author: 'Off Season Team',
    timestampIso: new Date(Date.now() - 45 * 60_000).toISOString(),
    thumbnailLabel: 'Update',
    excerpt:
      'We’re starting simple: episode talk, drops, training notes, and real-time reactions. Tell us what would make this feel like your locker room.',
    topComments: [
      {
        id: 'c1',
        author: 'Mack',
        body: 'Pinned episode threads + a place for clips would be perfect.',
        timestampIso: new Date(Date.now() - 31 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Rico',
        body: 'Let us tag players/teams and keep it organized by season.',
        timestampIso: new Date(Date.now() - 24 * 60_000).toISOString(),
      },
    ],
  },
  {
    id: 'p-s1e1',
    categoryId: 'episodes',
    categoryTitle: 'Episodes',
    title: 'S1E1 — David Njoku: biggest takeaway?',
    author: 'Rico',
    timestampIso: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
    thumbnailLabel: 'S1E1',
    excerpt:
      'That moment on mindset hit different. Curious what everyone took away and what you’re applying this week.',
    topComments: [
      {
        id: 'c1',
        author: 'Jules',
        body: 'The part about routine > motivation. Needed that reminder.',
        timestampIso: new Date(Date.now() - 2.6 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'The Locker Room',
        body: 'He made “consistency” sound like a skill you train, not a trait.',
        timestampIso: new Date(Date.now() - 2.2 * 60 * 60_000).toISOString(),
      },
    ],
  },
  {
    id: 'p-kittle',
    categoryId: 'episodes',
    categoryTitle: 'Episodes',
    title: 'S1E4 — George Kittle: training notes worth stealing',
    author: 'Jules',
    timestampIso: new Date(Date.now() - 22 * 60 * 60_000).toISOString(),
    thumbnailLabel: 'S1E4',
    excerpt:
      'What’s one drill, cue, or mental framework you wrote down immediately? Drop it here so we can build a shared notebook.',
    topComments: [
      {
        id: 'c1',
        author: 'Mack',
        body: 'Footwork detail was insane — small steps, fast eyes.',
        timestampIso: new Date(Date.now() - 21.5 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Rico',
        body: 'The “win the first rep” mentality applies outside training too.',
        timestampIso: new Date(Date.now() - 20.9 * 60 * 60_000).toISOString(),
      },
    ],
  },
  {
    id: 'p-hoodie',
    categoryId: 'merch',
    categoryTitle: 'Merch & Drops',
    title: 'Hoodie sizing: true-to-size? Post fit pics + notes',
    author: 'Mack',
    timestampIso: new Date(Date.now() - 4 * 24 * 60 * 60_000).toISOString(),
    thumbnailLabel: 'Merch',
    excerpt:
      'If you grabbed the last drop, how’s the fit? Include height/weight + size so everybody can dial it in.',
    topComments: [
      {
        id: 'c1',
        author: 'The Locker Room',
        body: 'Medium fits athletic. If you like baggy, go up one.',
        timestampIso: new Date(Date.now() - 3.8 * 24 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Jules',
        body: 'Sleeves run a touch long (in a good way).',
        timestampIso: new Date(Date.now() - 3.7 * 24 * 60 * 60_000).toISOString(),
      },
    ],
  },
] as const
