import { verifyFirebaseIdToken } from '@/firebase/admin'
import { createCheckoutSession } from '@/lib/stripe/server'

export async function handleCreateCheckoutSession(req: {
  headers: Record<string, string | string[] | undefined>
  body: { productId?: string }
  origin: string
}) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })

  const productId = req.body.productId
  if (!productId) throw Object.assign(new Error('Missing productId'), { statusCode: 400 })

  const successUrl = `${req.origin}/checkout/success`
  const cancelUrl = `${req.origin}/account`

  return createCheckoutSession({ userId: token.userId, productId, successUrl, cancelUrl })
}

export async function handleStripeWebhook(_rawBody: string, _signatureHeader: string | null) {
  // Placeholder:
  // - Verify Stripe signature
  // - On checkout.session.completed:
  //   - read client_reference_id (Firebase userId)
  //   - read metadata.productId
  //   - digital => entitlements/{userId}/{productId}
  //   - physical => orders/{orderId}
  throw Object.assign(new Error('Stripe webhook not configured.'), { statusCode: 501 })
}
