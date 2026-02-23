import { getFirebaseIdTokenOrNull } from '@/firebase/client'

async function getBearerTokenForApiOrThrow(): Promise<string> {
  const idToken = await getFirebaseIdTokenOrNull()
  if (idToken) return idToken

  if (typeof window !== 'undefined') {
    const devUserId = window.localStorage.getItem('offseason.devUserId')
    if (devUserId) return devUserId
  }

  throw new Error('You must be signed in to perform this action.')
}

export async function startStripeCheckout(productId: string) {
  const token = await getBearerTokenForApiOrThrow()
  const res = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to start checkout (${res.status}): ${text}`)
  }

  const data = (await res.json()) as { url: string }
  if (!data?.url) throw new Error('Checkout session did not return a URL')

  window.location.assign(data.url)
}

export async function openStripeBillingPortal() {
  const token = await getBearerTokenForApiOrThrow()
  const res = await fetch('/api/stripe/billing-portal', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to open billing portal (${res.status}): ${text}`)
  }

  const data = (await res.json()) as { url: string }
  if (!data?.url) throw new Error('Billing portal did not return a URL')

  window.location.assign(data.url)
}
