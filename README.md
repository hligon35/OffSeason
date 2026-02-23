# Off Season

Sports + culture media brand scaffold (Next.js App Router + TypeScript + Tailwind).

## Run

1. Install deps: `npm install`
2. Start dev server: `npm run dev`
3. Open: http://localhost:3000

## Deploy (Cloudflare Pages)

This repo can be deployed a couple ways. Given the current code (Next.js API routes for Stripe/Mux/Firebase Admin), **Vercel + Firebase** is the lowest-friction production path.

## Deploy (Vercel + Firebase)

1. Create a new Vercel project from this repo.
2. Set environment variables in Vercel (Project → Settings → Environment Variables):
	- Firebase client (browser): `NEXT_PUBLIC_FIREBASE_*`
	- Firebase Admin (server): `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (or `GOOGLE_APPLICATION_CREDENTIALS`)
	- Stripe/Mux secrets when you wire them up
3. In Firebase Console → Authentication → Settings → Authorized domains:
	- Add your Vercel production domain (and any preview domains you rely on)
	- Keep `localhost` for local dev

Important: never set `OFFSEASON_DEV_BYPASS_AUTH=true` in production.

---

## Deploy (Cloudflare Pages)

Cloudflare Pages needs a static output directory for deployment. For Next.js (App Router) on Cloudflare Pages, use the adapter build.

- Build command: `npm run pages:build`
- Output directory: `.vercel/output/static`

After you save those settings, trigger a new deployment in Cloudflare Pages.

### Custom domain

Set the production domain in Cloudflare Pages:

- Pages project → **Custom domains** → add `off-season.io`
- Ensure DNS records are created/verified by Cloudflare

Then add `off-season.io` to Firebase Auth **Authorized domains** so sign-in works in production.
