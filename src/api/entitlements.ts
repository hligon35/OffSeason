import { verifyFirebaseIdToken } from '@/firebase/admin'
import { getUserEntitlements } from '@/firebase/entitlements'

export async function handleGetEntitlements(req: { headers: Record<string, string | string[] | undefined> }) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })

  const entitlements = await getUserEntitlements(token.userId)
  return { userId: token.userId, entitlements }
}
