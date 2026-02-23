export type UserRole = 'user' | 'admin'

export type AuthUser = {
  userId: string
  email?: string | null
  displayName?: string | null
  photoURL?: string | null
  provider?: string | null
  roles: UserRole[]
}

export type VerifiedToken = {
  userId: string
  email?: string
  roles: UserRole[]
  raw: unknown
}
