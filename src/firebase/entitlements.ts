import type { Entitlement } from '@/lib/types/entitlements'
import { getAdminDb } from '@/firebase/admin'

// Firestore path convention:
// entitlements/{userId}/items/{productId}

export async function getUserEntitlements(userId: string): Promise<Entitlement[]> {
  const db = getAdminDb()
  const snap = await db.collection('entitlements').doc(userId).collection('items').get()
  return snap.docs
    .map((d) => {
      const data = d.data() as Partial<Entitlement> & { productId?: string }
      const productId = data.productId || d.id
      if (!productId) return null

      return {
        productId,
        type: data.type ?? 'purchase',
        source: data.source ?? 'stripe',
        createdAt: data.createdAt ?? new Date().toISOString(),
        expiresAt: data.expiresAt ?? null,
      } satisfies Entitlement
    })
    .filter((e): e is Entitlement => Boolean(e))
}

export async function hasEntitlement(userId: string, productId: string): Promise<boolean> {
  const ents = await getUserEntitlements(userId)
  return ents.some((e) => e.productId === productId && (e.expiresAt == null || Date.parse(e.expiresAt) > Date.now()))
}

export async function grantEntitlement(userId: string, productId: string): Promise<void> {
  const db = getAdminDb()
  const now = new Date().toISOString()
  await db
    .collection('entitlements')
    .doc(userId)
    .collection('items')
    .doc(productId)
    .set(
      {
        productId,
        type: 'grant',
        source: 'stripe',
        createdAt: now,
        expiresAt: null,
      } satisfies Entitlement,
      { merge: true }
    )
}
