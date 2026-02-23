import { verifyFirebaseIdToken } from '@/firebase/admin'
import { hasEntitlement } from '@/firebase/entitlements'
import { getSignedMuxPlaybackUrl } from '@/lib/mux/server'

export async function handleGetPlaybackUrl(req: {
  headers: Record<string, string | string[] | undefined>
  query: { episodeId?: string; productId?: string; productIds?: string }
}) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })

  const episodeId = req.query.episodeId
  if (!episodeId) throw Object.assign(new Error('Missing episodeId'), { statusCode: 400 })

  const candidatesFromList = (req.query.productIds ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const legacyProductId = (req.query.productId ?? '').trim()
  const entitlementCandidates = [...candidatesFromList, ...(legacyProductId ? [legacyProductId] : [])]

  if (entitlementCandidates.length === 0) {
    throw Object.assign(new Error('Missing productId(s)'), { statusCode: 400 })
  }

  const allowedAny = (await Promise.all(entitlementCandidates.map((id) => hasEntitlement(token.userId, id)))).some(Boolean)
  const allowed = allowedAny
  if (!allowed) throw Object.assign(new Error('Not entitled'), { statusCode: 403 })

  return getSignedMuxPlaybackUrl({ episodeId, userId: token.userId })
}
