# Stripe Connect notes (scaffold)

This project is designed to use Stripe Checkout + webhooks to grant entitlements and record orders.

If a percentage of revenue must go to another Stripe account, use **Stripe Connect**.

## Typical setup

- Platform creates Checkout Sessions.
- Pass Firebase user id:
  - `client_reference_id = <firebaseUserId>`
- Pass internal product id:
  - `metadata.productId = <productId>`

## Destination charges

For one-time purchases (Checkout `mode=payment`):
- Set a destination transfer to the connected account
- Set `application_fee_amount` for the platform

For subscriptions (Checkout `mode=subscription`):
- Configure subscription transfer + application fee so renewals keep splitting

## Webhooks

Keep the platform webhook endpoint URL:
- `/api/stripe/webhook`

Events you will typically use:
- `checkout.session.completed`
- `invoice.paid`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `charge.refunded`
- `charge.dispute.created`

## Env vars

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_CONNECT_DESTINATION_ACCOUNT_ID` (if one fixed recipient)
- `STRIPE_CONNECT_CLIENT_ID` (only if using Connect OAuth onboarding)
