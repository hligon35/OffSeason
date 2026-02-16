import Link from 'next/link'
import type { Engagement } from '@/lib/types/content'
import { CommentIcon, HeartIcon, ShareIcon } from '@/components/ui/Icons'

export function Thumb({ label }: { label: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-brand-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-100 via-brand-gray-50 to-brand-gray-200" />
      <div className="absolute inset-0 flex items-end">
        <div className="m-3 inline-flex rounded bg-brand-black/80 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-white">
          {label}
        </div>
      </div>
    </div>
  )
}

export function CategoryTag({ category, href }: { category: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-red hover:bg-brand-gray-50"
    >
      {category}
    </Link>
  )
}

export function MetaLine({ author, timestamp }: { author: string; timestamp: string }) {
  return <div className="text-xs text-brand-gray-600">By {author} · {formatRelative(timestamp)}</div>
}

export function EngagementRow({ engagement }: { engagement: Engagement }) {
  return (
    <div className="mt-3 flex items-center gap-4 text-xs text-brand-gray-600">
      <span className="inline-flex items-center gap-1">
        <HeartIcon className="h-4 w-4" /> {compact(engagement.likes)}
      </span>
      <span className="inline-flex items-center gap-1">
        <CommentIcon className="h-4 w-4" /> {compact(engagement.comments)}
      </span>
      <span className="inline-flex items-center gap-1">
        <ShareIcon className="h-4 w-4" /> {compact(engagement.shares)}
      </span>
    </div>
  )
}

function compact(n: number) {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M`
  if (n >= 1_000) return `${Math.round(n / 100) / 10}K`
  return String(n)
}

function formatRelative(iso: string) {
  const then = new Date(iso).getTime()
  const diffMin = Math.max(1, Math.round((Date.now() - then) / 60_000))
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.round(diffHr / 24)
  return `${diffDay}d ago`
}
