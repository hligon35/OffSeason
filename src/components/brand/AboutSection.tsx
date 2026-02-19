export function AboutSection({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">About</div>
      <h2 className="mt-1 text-2xl font-[800] tracking-tightish">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm text-brand-gray-700 sm:text-base">{body}</p>
    </section>
  )
}
