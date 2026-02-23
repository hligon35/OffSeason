export type StripeConnectMode = 'destination_charge'

export type RevenueShareConfig = {
  // The connected account that should receive the destination transfer.
  destinationAccountId: string

  // Platform fee expressed as a percentage.
  // Example: 10 means platform takes 10% and destination receives 90%.
  platformFeePercent: number
}

export function computeApplicationFeeAmount(params: {
  amountTotalCents: number
  platformFeePercent: number
}): number {
  const { amountTotalCents, platformFeePercent } = params
  if (platformFeePercent <= 0) return 0
  if (platformFeePercent >= 100) return amountTotalCents

  return Math.round((amountTotalCents * platformFeePercent) / 100)
}

export type ConnectCheckoutSessionHints = {
  // For Checkout mode=payment (one-time):
  // payment_intent_data: {
  //   application_fee_amount,
  //   transfer_data: { destination }
  // }
  //
  // For Checkout mode=subscription:
  // You must also configure subscription fee/transfer so renewals keep splitting.
  // Stripe supports subscription-level transfer data + application fees.
  //
  // NOTE: This module is scaffold-only and does not import the Stripe SDK.
}
