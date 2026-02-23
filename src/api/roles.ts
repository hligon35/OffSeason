import type { UserRole, VerifiedToken } from '@/lib/types/auth'

export function requireRole(token: VerifiedToken, role: UserRole) {
  if (!token.roles?.includes(role)) {
    throw Object.assign(new Error('Forbidden'), { statusCode: 403 })
  }
}
