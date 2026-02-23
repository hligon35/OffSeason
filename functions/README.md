# Cloud Functions scaffolding

This folder is a placeholder for Firebase Cloud Functions (or Cloud Run).

It is not wired to your build yet. Add dependencies and deploy tooling when ready.

Endpoints to implement (mirror Next API routes):
- GET /api/entitlements
- GET /api/playback-url
- POST /api/admin/grant-entitlement
- POST /stripe/webhook
- GET /playback-url (Mux signed URL)

Security requirements:
- Verify Firebase ID token
- Role-based access for admin endpoints
- Verify Stripe webhook signatures
- Never expose Mux asset IDs to the client
