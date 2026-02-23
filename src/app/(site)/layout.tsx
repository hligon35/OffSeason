import { Header } from '@/components/shell/Header'
import { Footer } from '@/components/shell/Footer'
import { Sidebar } from '@/components/shell/Sidebar'
import { Providers } from '@/components/auth/Providers'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-brand-black focus:px-3 focus:py-2 focus:text-sm focus:font-[800] focus:tracking-tightish focus:text-brand-white"
        >
          Skip to content
        </a>
        <Header />

        <div className="mx-auto w-full max-w-screen-2xl flex-1 px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-[minmax(0,1fr),340px]">
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <aside className="hidden lg:block">
              <Sidebar />
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </Providers>
  )
}
