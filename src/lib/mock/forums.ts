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
    description: 'Drops, notes, and what’s new inside Off Season.',
    threads: [
      {
        id: 'welcome',
        title: 'Welcome to the forums',
        author: 'Off Season Team',
        replies: 12,
        lastActivity: 'Today',
      },
      {
        id: 'season-one',
        title: 'Season One release schedule',
        author: 'Off Season Team',
        replies: 28,
        lastActivity: 'Yesterday',
      },
    ],
  },
  {
    id: 'episodes',
    title: 'Episodes',
    description: 'Episode-by-episode discussion, notes, and context.',
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
    description: 'Sizing, restocks, shipping, and new releases.',
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
        title: 'Next release wishlist',
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
    title: 'Welcome — what do you want from the forums?',
    author: 'Off Season Team',
    timestampIso: new Date(Date.now() - 45 * 60_000).toISOString(),
    thumbnailLabel: 'Update',
    excerpt:
      'We’re starting simple: episode talk, drops, training notes, and clean threads by season. Tell us what you want this space to become.',
    topComments: [
      {
        id: 'c1',
        author: 'Mack',
        body: 'Pinned episode threads + a dedicated place for clips would be perfect.',
        timestampIso: new Date(Date.now() - 31 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Rico',
        body: 'Tags for players/teams — and keep it organized by season.',
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
      'That moment on mindset landed. What did you catch on the first watch — and on the second?',
    topComments: [
      {
        id: 'c1',
        author: 'Jules',
        body: 'The routine vs. motivation distinction felt real — especially in the offseason stretch.',
        timestampIso: new Date(Date.now() - 2.6 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'The Locker Room',
        body: 'He talked about consistency like a trained behavior, not a personality trait.',
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
      'What’s one drill, cue, or small detail you wrote down immediately? Drop it here and keep the notes tight.',
    topComments: [
      {
        id: 'c1',
        author: 'Mack',
        body: 'Footwork detail was surgical — small steps, fast eyes.',
        timestampIso: new Date(Date.now() - 21.5 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Rico',
        body: 'The “first rep” emphasis says a lot about how he starts a day, not just a drill.',
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
      'If you grabbed the last release, how’s the fit? Include height/weight + size so the next order is easy.',
    topComments: [
      {
        id: 'c1',
        author: 'The Locker Room',
        body: 'Medium fits athletic. If you want room, go up one.',
        timestampIso: new Date(Date.now() - 3.8 * 24 * 60 * 60_000).toISOString(),
      },
      {
        id: 'c2',
        author: 'Jules',
        body: 'Sleeves run a touch long — in a good way.',
        timestampIso: new Date(Date.now() - 3.7 * 24 * 60 * 60_000).toISOString(),
      },
    ],
  },
] as const
