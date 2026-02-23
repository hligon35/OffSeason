export type CreateCheckoutSessionInput = {
  userId: string
  productId: string
  successUrl: string
  cancelUrl: string
}

export type CreateCheckoutSessionResult = {
  url: string
}

export async function createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
  // Placeholder:
  // - Install `stripe`
  // - Create a Checkout Session
  // - Set client_reference_id = Firebase userId
  // - Set metadata.productId
  void input
  throw Object.assign(new Error('Stripe not configured. Install `stripe` and implement createCheckoutSession().'), {
    statusCode: 501,
  })
}
