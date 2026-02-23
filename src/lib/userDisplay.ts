import type { AuthUser } from '@/lib/types/auth'

function cleanParts(parts: string[]): string[] {
  return parts.map((p) => p.trim()).filter(Boolean)
}

function titleCase(word: string): string {
  if (!word) return word
  return word[0]!.toUpperCase() + word.slice(1)
}

export function getUserFirstInitialAndLastName(user: AuthUser | null): string {
  if (!user) return ''

  const fromDisplayName = cleanParts(String(user.displayName ?? '').split(/\s+/g))
  if (fromDisplayName.length >= 2) {
    const first = fromDisplayName[0]!
    const last = fromDisplayName[fromDisplayName.length - 1]!
    return `${first[0]!.toUpperCase()}. ${last}`
  }

  const email = user.email ?? ''
  const localPart = email.split('@')[0] ?? ''
  const emailParts = cleanParts(localPart.split(/[._-]+/g)).map(titleCase)
  if (emailParts.length >= 2) {
    const first = emailParts[0]!
    const last = emailParts[emailParts.length - 1]!
    return `${first[0]!.toUpperCase()}. ${last}`
  }

  if (fromDisplayName.length === 1) {
    const only = fromDisplayName[0]!
    return `${only[0]!.toUpperCase()}. ${only}`
  }

  if (emailParts.length === 1) {
    const only = emailParts[0]!
    return `${only[0]!.toUpperCase()}. ${only}`
  }

  return user.userId
}

export function getUserAvatarFallbackLetter(user: AuthUser | null): string {
  if (!user) return ''
  const initial = (user.displayName?.trim()?.[0] ?? user.email?.trim()?.[0] ?? user.userId.trim()?.[0] ?? '').toUpperCase()
  return initial
}

export function getUserAvatarUrl(user: AuthUser | null): string | null {
  const url = user?.photoURL ?? null
  if (!url) return null
  return url
}
