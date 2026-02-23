export type SeasonId = string
export type EpisodeId = string

// Never expose Mux asset IDs to the client.
export type Episode = {
  id: EpisodeId
  seasonId: SeasonId
  title: string
  description?: string
  // Stored server-side only in Firestore (placeholder)
  muxAssetId?: string
  productId: string
}
