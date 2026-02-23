import type { AuthUser } from '@/lib/types/auth'

export type AuthProviderName = 'google' | 'apple' | 'password'

export type ClientAuth = {
  getCurrentUser(): Promise<AuthUser | null>
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signInWithEmailPassword(email: string, password: string): Promise<void>
  createAccountWithEmailPassword(email: string, password: string): Promise<void>
  sendPasswordReset(email: string): Promise<void>
  signInDev(userId: string, email?: string): Promise<void>
  signOut(): Promise<void>
}

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}

function readFirebaseConfigFromEnv(): FirebaseConfig | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  if (!apiKey || !authDomain || !projectId) return null

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
}

function hasDevSession(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(window.localStorage.getItem('offseason.devUserId'))
}

async function getDevSessionUser(): Promise<AuthUser | null> {
  if (typeof window === 'undefined') return null
  const userId = window.localStorage.getItem('offseason.devUserId')
  if (!userId) return null
  const email = window.localStorage.getItem('offseason.devEmail')
  return { userId, email, provider: 'dev', roles: ['user'] }
}

function notConfigured(method: string): never {
  throw new Error(
    `Firebase client auth is not configured. Tried to call ${method}. ` +
      'Set NEXT_PUBLIC_FIREBASE_* env vars (see env.secrets.example) and restart dev server.'
  )
}

async function getFirebaseAppAndAuth() {
  if (typeof window === 'undefined') return null
  const cfg = readFirebaseConfigFromEnv()
  if (!cfg) return null

  const { getApps, initializeApp } = await import('firebase/app')
  const { getAuth } = await import('firebase/auth')

  const app = getApps().length ? getApps()[0]! : initializeApp(cfg)
  const auth = getAuth(app)

  // Analytics is optional and only works in the browser.
  // Also guard on measurementId so local/dev doesn't break.
  if (cfg.measurementId) {
    try {
      const { getAnalytics, isSupported } = await import('firebase/analytics')
      const supported = await isSupported()
      if (supported) getAnalytics(app)
    } catch {
      // ignore analytics failures
    }
  }

  return { app, auth }
}

export async function getFirebaseIdTokenOrNull(): Promise<string | null> {
  const fb = await getFirebaseAppAndAuth()
  if (!fb) return null
  const user = fb.auth.currentUser
  if (!user) return null
  const { getIdToken } = await import('firebase/auth')
  return await getIdToken(user)
}

// Placeholder implementation that compiles without adding new dependencies.
export const clientAuth: ClientAuth = {
  async getCurrentUser() {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return getDevSessionUser()

    const { onAuthStateChanged } = await import('firebase/auth')

    if (fb.auth.currentUser) {
      const u = fb.auth.currentUser
      return {
        userId: u.uid,
        email: u.email,
        displayName: u.displayName,
        photoURL: u.photoURL,
        provider: u.providerId,
        roles: ['user'],
      }
    }

    return await new Promise<AuthUser | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(
        fb.auth,
        (u) => {
          unsubscribe()
          if (!u) return resolve(hasDevSession() ? getDevSessionUser() : null)
          resolve({
            userId: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
            provider: u.providerId,
            roles: ['user'],
          })
        },
        () => {
          unsubscribe()
          resolve(hasDevSession() ? getDevSessionUser() : null)
        }
      )
    })
  },
  async signInWithGoogle() {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return notConfigured('signInWithGoogle')

    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
    await signInWithPopup(fb.auth, new GoogleAuthProvider())
  },
  async signInWithApple() {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return notConfigured('signInWithApple')

    const { OAuthProvider, signInWithPopup } = await import('firebase/auth')
    const provider = new OAuthProvider('apple.com')
    await signInWithPopup(fb.auth, provider)
  },
  async signInWithEmailPassword(email: string, password: string) {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return notConfigured('signInWithEmailPassword')

    const { signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(fb.auth, email, password)
  },
  async createAccountWithEmailPassword(email: string, password: string) {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return notConfigured('createAccountWithEmailPassword')

    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    await createUserWithEmailAndPassword(fb.auth, email, password)
  },
  async sendPasswordReset(email: string) {
    const fb = await getFirebaseAppAndAuth()
    if (!fb) return notConfigured('sendPasswordReset')

    const { sendPasswordResetEmail } = await import('firebase/auth')
    await sendPasswordResetEmail(fb.auth, email)
  },
  async signInDev(userId: string, email?: string) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('offseason.devUserId', userId)
    if (email) window.localStorage.setItem('offseason.devEmail', email)
    else window.localStorage.removeItem('offseason.devEmail')
  },
  async signOut() {
    const fb = await getFirebaseAppAndAuth()
    if (fb) {
      const { signOut } = await import('firebase/auth')
      await signOut(fb.auth)
    }

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('offseason.devUserId')
      window.localStorage.removeItem('offseason.devEmail')
    }
  },
}
