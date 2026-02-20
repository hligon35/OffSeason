import Link from 'next/link'
import { footerColumns, socialLinks } from '@/lib/mock/links'

export function Footer() {
  return (
    <footer className="mt-10 w-full bg-brand-black text-brand-white">
      <div className="mx-auto w-full max-w-screen-2xl px-3 py-10 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr),minmax(260px,360px)] lg:grid-cols-[minmax(0,1fr),420px]">
          <div className="min-w-0">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/90">The Off Season</div>
            <ul className="mt-3 space-y-2">
              {footerColumns.flatMap((c) => c.links).map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-brand-white/75 hover:text-brand-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded border border-brand-gray-800 bg-brand-black p-5">
            <div className="text-xs font-[800] uppercase tracking-wide text-brand-white/90">Newsletter</div>
            <div className="mt-2 text-sm text-brand-white/75">Get the loudest segments and cleanest clips, first.</div>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full rounded border border-brand-gray-800 bg-brand-black px-3 py-2 text-sm text-brand-white outline-none placeholder:text-brand-white/40 focus:border-brand-red"
              />
              <button
                type="button"
                className="shrink-0 rounded bg-brand-red px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white hover:bg-brand-white hover:text-brand-black"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-brand-gray-800 px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white/80 hover:border-brand-red hover:text-brand-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-gray-800 pt-6 text-xs text-brand-white/60">
          © {new Date().getFullYear()} The Off Season. All takes reserved.
        </div>
      </div>
    </footer>
  )
}
