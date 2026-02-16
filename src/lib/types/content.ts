export type ContentKind = 'post' | 'video' | 'featured'

export type Engagement = {
  likes: number
  comments: number
  shares: number
}

export type ContentBase = {
  id: string
  kind: ContentKind
  href: string
  category: string
  title: string
  author: string
  timestampIso: string
  thumbnailLabel: string
  engagement: Engagement
}

export type PostItem = ContentBase & {
  kind: 'post'
}

export type VideoItem = ContentBase & {
  kind: 'video'
  duration: string
}

export type FeaturedItem = ContentBase & {
  kind: 'featured'
  dek: string
}

export type FeedItem = PostItem | VideoItem | FeaturedItem
