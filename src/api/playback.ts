import { verifyFirebaseIdToken } from '@/firebase/admin'
import { hasEntitlement } from '@/firebase/entitlements'
import { getSignedMuxPlaybackUrl } from '@/lib/mux/server'

export async function handleGetPlaybackUrl(req: {
  headers: Record<string, string | string[] | undefined>
  query: { episodeId?: string; productId?: string }
}) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })

  const episodeId = req.query.episodeId
  if (!episodeId) throw Object.assign(new Error('Missing episodeId'), { statusCode: 400 })

  // Simplest scaffold: require productId to be provided for entitlement check.
  const productId = req.query.productId
  if (!productId) throw Object.assign(new Error('Missing productId'), { statusCode: 400 })

  const allowed = await hasEntitlement(token.userId, productId)
  if (!allowed) throw Object.assign(new Error('Not entitled'), { statusCode: 403 })

  return getSignedMuxPlaybackUrl({ episodeId, userId: token.userId })
}
