# Off Season

Sports + culture media brand scaffold (Next.js App Router + TypeScript + Tailwind).

## Run

1. Install deps: `npm install`
2. Start dev server: `npm run dev`
3. Open: http://localhost:3000

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
