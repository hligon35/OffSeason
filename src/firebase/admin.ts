import type { UserRole, VerifiedToken } from '@/lib/types/auth'

import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

export type VerifyOptions = {
  authorizationHeader?: string | null
}

function parseBearerToken(authorizationHeader?: string | null) {
  if (!authorizationHeader) return null
  const [scheme, token] = authorizationHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}

function getFirebaseProjectId() {
  return process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || undefined
}

function normalizePrivateKey(key?: string) {
  if (!key) return undefined
  return key.replace(/\\n/g, '\n')
}

function adminIsConfigured() {
  const hasServiceAccount = Boolean(process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)
  const hasAdc = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  return Boolean(getFirebaseProjectId() && (hasServiceAccount || hasAdc))
}

function getAdminApp() {
  if (getApps().length) return getApps()[0]!

  const projectId = getFirebaseProjectId()
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY)

  if (projectId && clientEmail && privateKey) {
    return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId })
  }

  if (projectId) {
    return initializeApp({ credential: applicationDefault(), projectId })
  }

  // Fallback: let firebase-admin try to discover projectId.
  return initializeApp({ credential: applicationDefault() })
}

export function getAdminDb() {
  const app = getAdminApp()
  return getFirestore(app)
}

export async function verifyFirebaseIdToken({ authorizationHeader }: VerifyOptions): Promise<VerifiedToken> {
  const token = parseBearerToken(authorizationHeader)
  if (!token) {
    throw Object.assign(new Error('Missing Authorization Bearer token'), { statusCode: 401 })
  }

  // Scaffold-only behavior:
  // - If OFFSEASON_DEV_BYPASS_AUTH is set, accept any token and treat it as a userId.
  // - Otherwise, instruct how to enable real verification.
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
  if (process.env.OFFSEASON_DEV_BYPASS_AUTH === 'true') {
    if (isProduction) {
      throw Object.assign(new Error('OFFSEASON_DEV_BYPASS_AUTH is not allowed in production.'), { statusCode: 500 })
    }
    const userId = token
    const roles: UserRole[] = ['user']
    return { userId, roles, raw: { bypass: true } }
  }

  if (!adminIsConfigured()) {
    throw Object.assign(
      new Error(
        'Firebase Admin token verification is not configured. Set FIREBASE_PROJECT_ID plus either GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.'
      ),
      { statusCode: 501 }
    )
  }

  const app = getAdminApp()
  const auth = getAuth(app)
  const decoded = await auth.verifyIdToken(token)

  const roles: UserRole[] = ['user']
  const decodedRoles = (decoded as any).roles
  if (Array.isArray(decodedRoles)) {
    for (const r of decodedRoles) {
      if (r === 'admin' && !roles.includes('admin')) roles.push('admin')
    }
  }
  if ((decoded as any).admin === true && !roles.includes('admin')) roles.push('admin')

  return {
    userId: decoded.uid,
    email: decoded.email,
    roles,
    raw: decoded,
  }
}
