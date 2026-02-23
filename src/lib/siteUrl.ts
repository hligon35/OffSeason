export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://off-season.io'
  try {
    return new URL(raw)
  } catch {
    return new URL('https://off-season.io')
  }
}

export function getSiteOrigin(): string {
  return getSiteUrl().toString().replace(/\/$/, '')
}
