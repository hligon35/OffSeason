import Image from 'next/image'

type VimeoOttSeasonPlayerProps = {
  embedSrc: string
  title?: string
  logoSrc?: string
  logoAlt?: string
}

export function VimeoOttSeasonPlayer({
  embedSrc,
  title = 'Season One Player',
  logoSrc = '/offseasonlogo.png',
  logoAlt = 'Off Season',
}: VimeoOttSeasonPlayerProps) {
  const hasEmbed = typeof embedSrc === 'string' && embedSrc.trim().length > 0

  return (
    <section className="overflow-hidden rounded border border-brand-gray-200 bg-brand-black">
      <div className="relative aspect-[16/9] w-full">
        {hasEmbed ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedSrc}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="text-sm font-[800] text-brand-white">Player unavailable</div>
            <div className="text-xs text-brand-gray-300">
              This video isn’t available right now.
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded bg-brand-black/60 px-2 py-1">
          <Image src={logoSrc} alt={logoAlt} width={120} height={28} className="h-6 w-auto object-contain" priority />
        </div>
      </div>
    </section>
  )
}
