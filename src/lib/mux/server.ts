export type SignedPlaybackUrlResult = {
  url: string
  expiresAt: string
}

export async function getSignedMuxPlaybackUrl(params: { episodeId: string; userId: string }): Promise<SignedPlaybackUrlResult> {
  // Placeholder:
  // - Look up episode in Firestore: media/{seasonId}/episodes/{episodeId}
  // - Read muxAssetId server-side only
  // - Sign a playback URL server-side
  void params

  throw Object.assign(
    new Error('Mux signing not configured. Add a Mux signing implementation in src/lib/mux/server.ts.'),
    { statusCode: 501 }
  )
}
