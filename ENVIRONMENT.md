# Environment setup (scaffold)

This repo currently contains **scaffold-only** implementations for Firebase Auth, Firestore entitlements, Stripe Checkout, and Mux signed playback.

## 1) Local environment file

- Fill in the placeholders in `env.secrets.example`.
- Then either:
  - copy the values into `.env.local` (recommended for Next.js), or
  - copy it to `env.secrets` and start Next with your shell loading `env.secrets`.

Note: `.gitignore` ignores `.env*` files and `env.secrets`. Avoid committing any secret-bearing env file.

## Production domain

The production domain for this site is:

- `https://off-season.io`

You’ll need to register this domain in Firebase Auth (and Google OAuth) for sign-in to work in production.

## 2) Firebase

Client config vars are used by the browser app (Google + Apple sign-in).
Server/admin vars are used by API routes to:
- verify Firebase ID tokens
- read/write Firestore (`users/{userId}`, `entitlements/{userId}/{productId}`, etc.)

Scaffold behavior:
- If `OFFSEASON_DEV_BYPASS_AUTH=true`, server verification is bypassed and the bearer token is treated as a userId.

### Firebase Auth: required settings for production

In Firebase Console:

- **Authentication → Sign-in method**
  - Enable **Google**
  - Enable **Email/Password** (only if you want “Create account” via email/password)
  - Enable **Apple** only when you’re ready for Apple Developer configuration

- **Authentication → Settings → Authorized domains**
  - Add `off-season.io`
  - Keep `localhost` for local dev

### Google OAuth consent screen (recommended)

If you’re using Google sign-in, also ensure the Google Cloud OAuth consent screen lists your domain:

- Google Cloud Console → **APIs & Services → OAuth consent screen**
  - Add `off-season.io` under **Authorized domains**
  - Fill in app home/privacy/terms links when ready

If you skip this, Firebase Auth can still work, but you may hit verification/consent warnings depending on how your project is configured.

## 3) Stripe

Expected behavior (to implement later):
- Checkout Session includes:
  - `client_reference_id = firebaseUserId`
  - `metadata.productId = productId`
- Webhook `checkout.session.completed`:
  - digital -> write entitlement in Firestore
  - physical -> write order record in Firestore

### Stripe Connect (revenue share)

If a percentage of revenue goes to another Stripe account, use **Stripe Connect**. The common pattern for this architecture is:

- **Destination charges** (platform creates the Checkout Session)
  - One-time purchase (Checkout `mode=payment`):
    - `payment_intent_data.transfer_data.destination = <connectedAccountId>`
    - `payment_intent_data.application_fee_amount = <fee>`
  - Subscription (Checkout `mode=subscription`):
    - Configure subscription transfer + fees so renewals continue to split correctly.

In the simplest case (one fixed recipient), set:
- `STRIPE_CONNECT_DESTINATION_ACCOUNT_ID`

If different partners get paid, store destination account IDs per product in Firestore.

Webhook events are still received on the **platform** account webhook endpoint (same URL) and processed the same way.

## 4) Mux

Expected behavior (to implement later):
- API endpoint returns a **signed playback URL**
- Client never sees Mux asset IDs

### Mux Data analytics (recommended)

If you use Mux Player on the web, set the Mux Data environment key as a **public** Next.js env var:

- `NEXT_PUBLIC_MUX_DATA_ENV_KEY`

This value is used client-side (in the player component) via the `envKey` prop/attribute.

## Key files

- Firebase client/server scaffolding: `src/firebase/*`
- Entitlements helpers: `src/firebase/entitlements.ts`
- Stripe stubs: `src/lib/stripe/*`
- Mux stubs: `src/lib/mux/*`
- API routes: `src/pages/api/*`
- Hooks: `src/hooks/*`
- Product pages: `src/pages/media/*`, `src/pages/merch/*`
