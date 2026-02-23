import { getAdminDb } from '@/firebase/admin'

export type Order = {
  orderId: string
  userId: string
  productId: string
  status: 'paid'
  createdAt: string
  stripeCheckoutSessionId: string
  stripeCustomerId?: string | null
}

// Firestore path convention:
// orders/{stripeCheckoutSessionId}
export async function upsertOrder(order: Order): Promise<void> {
  const db = getAdminDb()
  await db.collection('orders').doc(order.orderId).set(order, { merge: true })
}
