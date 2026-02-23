# Deployment (Vercel + Firebase)

This repository is currently structured to run privileged server logic via Next.js API routes in `src/pages/api/*`.
For production, the simplest path is:

- Frontend + API routes: **Vercel**
- Auth + data: **Firebase Auth + Firestore**

## Vercel project settings

- Framework preset: Next.js
- Build command: `npm run build`
- Output: default

## Environment variables

### Firebase (client)

These are read in the browser:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (optional)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (optional)
- `NEXT_PUBLIC_FIREBASE_APP_ID` (optional)
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

### Firebase (admin/server)

Used by API routes to verify ID tokens and access Firestore via Admin SDK:

- `FIREBASE_PROJECT_ID`

Plus one of:

- `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`
- OR `GOOGLE_APPLICATION_CREDENTIALS` (points to a service account JSON file in your runtime environment)

### Stripe (server)

Required once you implement Checkout + webhook fulfillment:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Optional (only if using Stripe Connect patterns described in ENVIRONMENT.md):

- `STRIPE_CONNECT_DESTINATION_ACCOUNT_ID`
- `STRIPE_CONNECT_CLIENT_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (only if you add Stripe.js client-side)

### Mux (server)

Required once you implement signed playback:

- `MUX_SIGNING_KEY_ID`
- `MUX_SIGNING_PRIVATE_KEY`

Optional depending on how you implement playback + asset management:

- `MUX_TOKEN_ID`
- `MUX_TOKEN_SECRET`

### Mux Data (client/public)

Used by the web player to send playback analytics to Mux Data:

- `NEXT_PUBLIC_MUX_DATA_ENV_KEY`

## Production safety

- Do not set `OFFSEASON_DEV_BYPASS_AUTH=true` in production.
- Add your production domain to Firebase Auth authorized domains.

## Next steps for a real launch

The Stripe + Mux server implementations are still stubs:

- Stripe Checkout: `src/lib/stripe/server.ts`
- Stripe webhook fulfillment: `src/api/stripe.ts`
- Mux signing: `src/lib/mux/server.ts`
