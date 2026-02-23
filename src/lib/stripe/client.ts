export async function startStripeCheckout(productId: string) {
  const res = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
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
