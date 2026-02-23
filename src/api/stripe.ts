import { verifyFirebaseIdToken } from '@/firebase/admin'
import { upsertEntitlement } from '@/firebase/entitlements'
import { upsertOrder } from '@/firebase/orders'
import { getStripeCustomerId, setStripeCustomerId } from '@/firebase/users'
import { constructStripeWebhookEvent, createBillingPortalSession, createCheckoutSession, createStripeCustomer } from '@/lib/stripe/server'
import { getProduct } from '@/lib/products/catalog'
import Stripe from 'stripe'

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

  let customerId = await getStripeCustomerId(token.userId)
  if (!customerId) {
    const created = await createStripeCustomer({ userId: token.userId, email: token.email ?? null })
    customerId = created.id
    await setStripeCustomerId(token.userId, customerId)
  }

  return createCheckoutSession({ userId: token.userId, customerId, productId, successUrl, cancelUrl })
}

export async function handleCreateBillingPortalSession(req: {
  headers: Record<string, string | string[] | undefined>
  origin: string
}) {
  const authorizationHeader = (req.headers['authorization'] as string | undefined) ?? null
  const token = await verifyFirebaseIdToken({ authorizationHeader })

  let customerId = await getStripeCustomerId(token.userId)
  if (!customerId) {
    const created = await createStripeCustomer({ userId: token.userId, email: token.email ?? null })
    customerId = created.id
    await setStripeCustomerId(token.userId, customerId)
  }

  const returnUrl = `${req.origin}/account#billing`
  return createBillingPortalSession({ customerId, returnUrl })
}

export async function handleStripeWebhook(_rawBody: string, _signatureHeader: string | null) {
  const event = constructStripeWebhookEvent(_rawBody, _signatureHeader)

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session

      const userId = session.client_reference_id ?? null
      const productId = session.metadata?.productId ?? null
      if (!userId || !productId) return

      if (session.payment_status && session.payment_status !== 'paid') return

      if (typeof session.customer === 'string' && session.customer) {
        const existing = await getStripeCustomerId(userId)
        if (!existing) await setStripeCustomerId(userId, session.customer)
      }

      const product = getProduct(productId)
      if (!product) return

      if (product.kind === 'digital') {
        await upsertEntitlement(userId, {
          productId,
          type: 'purchase',
          source: 'stripe',
          createdAt: new Date().toISOString(),
          expiresAt: null,
        })
        return
      }

      if (product.kind === 'physical') {
        const orderId = session.id
        await upsertOrder({
          orderId,
          userId,
          productId,
          status: 'paid',
          createdAt: new Date().toISOString(),
          stripeCheckoutSessionId: session.id,
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
        })
        return
      }

      return
    }

    default:
      // Ignore unhandled event types for now.
      return
  }
}
