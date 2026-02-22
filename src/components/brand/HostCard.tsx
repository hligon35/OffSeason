import Image from 'next/image'

export function HostCard({
  name,
  bio,
  avatarText,
  avatarSrc,
}: {
  name: string
  bio: string
  avatarText?: string
  avatarSrc?: string
}) {
  const computedInitials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  const initials = (avatarText ?? computedInitials ?? '?').slice(0, 3)

  return (
    <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
      <div className="flex items-start gap-4">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-gray-200 bg-brand-gray-50">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={name} fill sizes="44px" className="object-cover" />
          ) : (
            <div
              aria-hidden="true"
              className="text-xs font-[800] uppercase tracking-wide text-brand-gray-700"
            >
              {initials}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mt-1 truncate text-lg font-[800] tracking-tightish">{name}</div>

          <p className="mt-3 text-sm text-brand-gray-700">{bio}</p>
        </div>
      </div>
    </div>
  )
}
