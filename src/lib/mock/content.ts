import type { FeedItem, FeaturedItem, VideoItem } from '@/lib/types/content'

type FeedScope = 'home' | 'episodes' | 'clips' | 'personalities' | `topic:${string}` | `episode:${string}`

const categories = [
  'Off Season TV',
  'Behind The Scenes',
  'Hot Takes',
  'Training Camp',
  'Fan Submissions',
]

const authors = [
  'Coach V',
  'Rico',
  'Jules',
  'Mack',
  'The Locker Room',
]

const titleBitsA = ['This Week', 'Breaking Down', 'Why Everyone Is Talking About', 'The Real Story Behind', 'We Tried', 'The Wildest']
const titleBitsB = ['camp energy', 'preseason chaos', 'the locker room rumor', 'a viral hot take', 'the new rotation', 'fan submissions']

function hashToUint32(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function lcg(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 2 ** 32
  }
}

function pick<T>(rand: () => number, list: readonly T[]) {
  return list[Math.floor(rand() * list.length)]
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.floor(n)))
}

export function getMockFeedPage(opts: {
  scope: FeedScope
  page: number
  pageSize?: number
}): { items: FeedItem[]; nextPage: number } {
  const pageSize = opts.pageSize ?? 12
  const seed = hashToUint32(`${opts.scope}|${opts.page}`)
  const rand = lcg(seed)
  const now = Date.now()

  const items: FeedItem[] = Array.from({ length: pageSize }).map((_, idx) => {
    const roll = rand()
    const category = pick(rand, categories)
    const author = pick(rand, authors)
    const minutesAgo = clampInt(rand() * 60 * 48, 3, 60 * 72)
    const timestampIso = new Date(now - minutesAgo * 60 * 1000).toISOString()
    const title = `${pick(rand, titleBitsA)} ${pick(rand, titleBitsB)}`
    const engagement = {
      likes: clampInt(rand() * 2400, 5, 2400),
      comments: clampInt(rand() * 650, 0, 650),
      shares: clampInt(rand() * 220, 0, 220),
    }

    const base = {
      id: `${opts.scope}:${opts.page}:${idx}`,
      category,
      title,
      author,
      timestampIso,
      thumbnailLabel: category,
      engagement,
    } as const

    if (roll < 0.18 && idx % 6 === 0) {
      const featured: FeaturedItem = {
        ...base,
        kind: 'featured',
        href: `/episode/${slugify(title)}-${opts.page}${idx}`,
        dek: 'Big energy. Big opinions. The kind of segment that starts group chats.',
      }
      return featured
    }

    if (roll < 0.48) {
      const video: VideoItem = {
        ...base,
        kind: 'video',
        href: `/episode/${slugify(title)}-${opts.page}${idx}`,
        duration: `${clampInt(rand() * 9 + 1, 1, 10)}:${String(clampInt(rand() * 59, 0, 59)).padStart(2, '0')}`,
      }
      return video
    }

    return {
      ...base,
      kind: 'post',
      href: `/topics/${slugify(category)}`,
    }
  })

  return { items, nextPage: opts.page + 1 }
}

export function getMockEpisode(slug: string) {
  const seed = hashToUint32(`episode:${slug}`)
  const rand = lcg(seed)
  const category = pick(rand, categories)
  const author = pick(rand, authors)
  const title = `Episode: ${unslugify(slug)}`
  const minutesAgo = clampInt(rand() * 60 * 24 * 14, 15, 60 * 24 * 30)
  const timestampIso = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()
  return {
    slug,
    category,
    title,
    author,
    timestampIso,
    duration: `${clampInt(rand() * 25 + 20, 20, 55)}:${String(clampInt(rand() * 59, 0, 59)).padStart(2, '0')}`,
    summary:
      'No fluff: headlines, culture, and the takes you’ll defend in the group chat. Featuring rapid-fire segments and a clean rundown.',
  }
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function unslugify(input: string) {
  return input.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
}
