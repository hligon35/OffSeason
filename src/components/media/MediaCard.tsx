import Link from 'next/link'

export function MediaCard(props: { title: string; href: string; description?: string }) {
  return (
    <Link href={props.href} className="block rounded border border-brand-gray-200 bg-brand-white p-4 hover:border-brand-red">
      <div className="text-sm font-[800] tracking-tightish">{props.title}</div>
      {props.description ? <div className="mt-2 text-sm text-brand-gray-700">{props.description}</div> : null}
    </Link>
  )
}
