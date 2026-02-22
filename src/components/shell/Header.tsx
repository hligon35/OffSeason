'use client'

import Link from 'next/link'
import Image from 'next/image'
import * as React from 'react'
import { SearchIcon, UserIcon } from '@/components/ui/Icons'

const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'The Show', href: '/the-show' },
  { label: 'The Podcast', href: '/podcast' },
  { label: 'Store', href: '/store' },
] as const

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-50 w-full bg-brand-black text-brand-white ' +
        (scrolled ? 'border-b border-brand-gray-800' : '')
      }
    >
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-3 px-3 sm:px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-[800] tracking-tightish">
          <Image
            src="/offseasonlogo.png"
            alt="Off Season"
            width={28}
            height={28}
            className="h-7 w-7 rounded"
            priority
          />
          <span className="text-sm sm:text-base">OFF SEASON</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-5 pl-4 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-[800] uppercase tracking-wide text-brand-white/90 hover:text-brand-white"
            >
              <span className="border-b-2 border-transparent hover:border-brand-red">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-brand-gray-900"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded border border-brand-gray-800 px-3 py-2 text-xs font-[800] uppercase tracking-wide hover:border-brand-red"
          >
            <UserIcon className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>

      <nav className="lg:hidden">
        <div className="mx-auto w-full max-w-screen-2xl overflow-x-auto px-3 pb-2">
          <div className="flex min-w-max items-center gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-xs font-[800] uppercase tracking-wide text-brand-white/85 hover:text-brand-white"
              >
                <span className="border-b-2 border-transparent hover:border-brand-red">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
