import Link from 'next/link'
import { EpisodePlayer } from '@/components/media/EpisodePlayer'
import { startStripeCheckout } from '@/lib/stripe/client'

export default function EpisodePage() {
  // Placeholder: read params from router and load episode from Firestore.
  const episodeId = 's1e1'
  const productId = 'media_season1'

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Episode</div>
        <h1 className="mt-1 text-2xl font-[800] tracking-tightish">{episodeId}</h1>
        <p className="mt-2 text-sm text-brand-gray-700">Playback is gated by entitlements and uses signed URLs.</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => startStripeCheckout(productId)}
            className="rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
          >
            Buy season access
          </button>
          <Link href="/account" className="text-sm text-brand-gray-700 hover:text-brand-red">
            Account
          </Link>
        </div>
      </div>

      <EpisodePlayer episodeId={episodeId} productId={productId} />
    </div>
  )
}
