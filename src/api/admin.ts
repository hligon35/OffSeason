import { verifyFirebaseIdToken } from '@/firebase/admin'
import { grantEntitlement } from '@/firebase/entitlements'
import { requireRole } from '@/api/roles'

export async function handleAdminGrantEntitlement(req: {
  headers: Record<string, string | string[] | undefined>
  body: { userId?: string; productId?: string }
}) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })
  requireRole(token, 'admin')

  const { userId, productId } = req.body
  if (!userId || !productId) throw Object.assign(new Error('Missing userId or productId'), { statusCode: 400 })

  await grantEntitlement(userId, productId)
  return { ok: true }
}
