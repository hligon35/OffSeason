import { getMockFeedPage } from '@/lib/mock/content'
import type { FeedItem } from '@/lib/types/content'

type SearchResult = {
  id: string
  title: string
  description: string
  scopeLabel: 'Episodes' | 'Clips'
  kindLabel: string
}

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function itemDescription(item: FeedItem): string {
  if (item.kind === 'featured') return item.dek
  if (item.kind === 'video') return `${item.category} · ${item.author}`
  return `${item.category} · ${item.author}`
}

function kindLabel(item: FeedItem): string {
  if (item.kind === 'featured') return 'Featured'
  if (item.kind === 'video') return 'Video'
  return 'Post'
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  const scopes: Array<{ scope: 'episodes' | 'clips'; scopeLabel: SearchResult['scopeLabel'] }> = [
    { scope: 'episodes', scopeLabel: 'Episodes' },
    { scope: 'clips', scopeLabel: 'Clips' },
  ]

  for (const s of scopes) {
    // Keep this small; it runs in the header.
    for (let page = 0; page < 4; page++) {
      const { items } = getMockFeedPage({ scope: s.scope, page, pageSize: 12 })
      for (const item of items) {
        results.push({
          id: item.id,
          title: item.title,
          description: itemDescription(item),
          scopeLabel: s.scopeLabel,
          kindLabel: kindLabel(item),
        })
      }
    }
  }

  return results
}

let cachedIndex: SearchResult[] | null = null

export function searchMockEpisodesAndClips(query: string, limit = 6): SearchResult[] {
  const q = normalize(query)
  if (!q) return []

  if (!cachedIndex) cachedIndex = buildIndex()

  const out: Array<{ score: number; r: SearchResult }> = []
  for (const r of cachedIndex) {
    const hay = normalize(`${r.title} ${r.description}`)
    const idx = hay.indexOf(q)
    if (idx === -1) continue

    // Small scoring: title matches rank higher.
    const titleHay = normalize(r.title)
    const titleIdx = titleHay.indexOf(q)
    const score = titleIdx !== -1 ? 1000 - titleIdx : 500 - idx
    out.push({ score, r })
  }

  out.sort((a, b) => b.score - a.score)
  return out.slice(0, limit).map((x) => x.r)
}

export type { SearchResult }
