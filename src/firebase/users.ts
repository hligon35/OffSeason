import type { UserRole } from '@/lib/types/auth'
import { getAdminDb } from '@/firebase/admin'

export type UserDoc = {
  email: string | null
  provider: string | null
  createdAt: string
  lastLogin: string
  roles: UserRole[]
  stripeCustomerId?: string | null
}

export async function ensureUserDocument(params: {
  userId: string
  email: string | null
  provider: string | null
}): Promise<void> {
  // On first login, create users/{userId} with:
  // email, provider, createdAt, lastLogin, roles=['user']
  // On subsequent logins, update lastLogin.
  const db = getAdminDb()
  const ref = db.collection('users').doc(params.userId)
  const now = new Date().toISOString()

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists) {
      const doc: UserDoc = {
        email: params.email,
        provider: params.provider,
        createdAt: now,
        lastLogin: now,
        roles: ['user'],
      }
      tx.set(ref, doc)
      return
    }

    tx.set(
      ref,
      {
        email: params.email,
        provider: params.provider,
        lastLogin: now,
      },
      { merge: true }
    )
  })
}

export async function getStripeCustomerId(userId: string): Promise<string | null> {
  const db = getAdminDb()
  const snap = await db.collection('users').doc(userId).get()
  const data = snap.exists ? (snap.data() as Partial<UserDoc>) : null
  const id = data?.stripeCustomerId
  return typeof id === 'string' && id.trim() ? id : null
}

export async function setStripeCustomerId(userId: string, stripeCustomerId: string): Promise<void> {
  const db = getAdminDb()
  await db.collection('users').doc(userId).set({ stripeCustomerId }, { merge: true })
}
