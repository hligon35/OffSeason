import Link from 'next/link'

function ModuleShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded border border-brand-gray-200 bg-brand-white">
      <div className="border-b border-brand-gray-200 px-4 py-3">
        <h3 className="text-xs font-[800] uppercase tracking-wide text-brand-black">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

export function Sidebar() {
  return (
    <div className="space-y-4">
      <ModuleShell title="Current episodes">
        <ul className="space-y-3">
          {['The Preseason Panic Draft', 'Camp Wars: Day 3', 'Hot Takes That Aged Too Well', 'Fan Calls Go Nuclear'].map(
            (t) => (
              <li key={t}>
                <Link
                  href={`/episode/${t.toLowerCase().replace(/\s+/g, '-')}`}
                  prefetch={false}
                  className="block text-sm font-[700] hover:text-brand-red"
                >
                  {t}
                </Link>
                <div className="text-xs text-brand-gray-600">2h ago · Off Season TV</div>
              </li>
            ),
          )}
        </ul>
      </ModuleShell>

      <ModuleShell title="Top clips">
        <ul className="space-y-3">
          {['The One Take That Broke The Internet', 'Mic’d Up: Locker Room Chaos', 'Training Camp Mythbusters'].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <div className="h-12 w-20 flex-none rounded bg-brand-gray-100" />
              <div>
                <Link
                  href={`/episode/${t.toLowerCase().replace(/\s+/g, '-')}`}
                  prefetch={false}
                  className="block text-sm font-[700] hover:text-brand-red"
                >
                  {t}
                </Link>
                <div className="text-xs text-brand-gray-600">Clip · 0:42</div>
              </div>
            </li>
          ))}
        </ul>
      </ModuleShell>

      <ModuleShell title="Merch">
        <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-3">
          <div className="text-sm font-[800] uppercase tracking-wide">New drop</div>
          <div className="mt-1 text-sm text-brand-gray-700">Essentials for the long stretch. Clean marks. Quiet fits.</div>
          <Link
            href="/merch"
            className="mt-3 inline-flex rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-gray-900"
          >
            Shop merch
          </Link>
        </div>
      </ModuleShell>
    </div>
  )
}
