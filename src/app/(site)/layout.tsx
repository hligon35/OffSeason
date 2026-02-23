import { Header } from '@/components/shell/Header'
import { Footer } from '@/components/shell/Footer'
import { Sidebar } from '@/components/shell/Sidebar'
import { Providers } from '@/components/auth/Providers'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-dvh flex-col">
        <Header />

        <div className="mx-auto w-full max-w-screen-2xl flex-1 px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-[minmax(0,1fr),340px]">
            <main>{children}</main>
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
