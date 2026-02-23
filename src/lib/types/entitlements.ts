export type EntitlementType = 'purchase' | 'subscription' | 'grant'
export type EntitlementSource = 'stripe'

export type Entitlement = {
  productId: string
  type: EntitlementType
  source: EntitlementSource
  createdAt: string
  expiresAt: string | null
}
