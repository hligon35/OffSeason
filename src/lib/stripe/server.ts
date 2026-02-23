import Stripe from 'stripe'
import { getProduct } from '@/lib/products/catalog'

export type CreateCheckoutSessionInput = {
  userId: string
  customerId: string
  productId: string
  successUrl: string
  cancelUrl: string
}

export type CreateCheckoutSessionResult = {
  url: string
}

export type CreateBillingPortalSessionInput = {
  customerId: string
  returnUrl: string
}

export type CreateBillingPortalSessionResult = {
  url: string
}

export type CreateStripeCustomerInput = {
  userId: string
  email?: string | null
}

let cachedStripe: Stripe | null = null

function getStripe(): Stripe {
  if (cachedStripe) return cachedStripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw Object.assign(new Error('Stripe not configured. Missing STRIPE_SECRET_KEY.'), { statusCode: 501 })
  }

  cachedStripe = new Stripe(key, {
    apiVersion: '2024-06-20',
  })
  return cachedStripe
}

export async function createStripeCustomer(input: CreateStripeCustomerInput): Promise<{ id: string }> {
  const stripe = getStripe()
  const customer = await stripe.customers.create({
    email: input.email ?? undefined,
    metadata: {
      firebaseUserId: input.userId,
    },
  })
  return { id: customer.id }
}

export async function createBillingPortalSession(
  input: CreateBillingPortalSessionInput
): Promise<CreateBillingPortalSessionResult> {
  const stripe = getStripe()
  const session = await stripe.billingPortal.sessions.create({
    customer: input.customerId,
    return_url: input.returnUrl,
  })
  return { url: session.url }
}

export async function createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
  const stripe = getStripe()

  const product = getProduct(input.productId)
  if (!product) throw Object.assign(new Error(`Unknown productId: ${input.productId}`), { statusCode: 404 })

  const priceId = getStripePriceIdForProductOrThrow(input.productId)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer: input.customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: withCheckoutSessionParam(input.successUrl),
    cancel_url: input.cancelUrl,
    client_reference_id: input.userId,
    metadata: {
      productId: input.productId,
    },
  })

  if (!session.url) throw Object.assign(new Error('Stripe Checkout session did not return a URL.'), { statusCode: 500 })
  return { url: session.url }
}

export function constructStripeWebhookEvent(rawBody: string, signatureHeader: string | null): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw Object.assign(new Error('Stripe webhook not configured. Missing STRIPE_WEBHOOK_SECRET.'), { statusCode: 501 })
  }
  if (!signatureHeader) {
    throw Object.assign(new Error('Missing Stripe-Signature header.'), { statusCode: 400 })
  }

  const stripe = getStripe()
  return stripe.webhooks.constructEvent(rawBody, signatureHeader, secret)
}

function getStripePriceIdForProductOrThrow(productId: string): string {
  const envVarName = `STRIPE_PRICE_ID_${String(productId).toUpperCase()}`
  const priceId = (process.env as Record<string, string | undefined>)[envVarName]
  if (!priceId) {
    throw Object.assign(new Error(`Missing ${envVarName} for product ${productId}.`), { statusCode: 501 })
  }
  return priceId
}

function withCheckoutSessionParam(url: string) {
  return url.includes('{CHECKOUT_SESSION_ID}')
    ? url
    : `${url}${url.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`
}
