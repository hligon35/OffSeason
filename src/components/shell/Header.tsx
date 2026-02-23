'use client'

import Link from 'next/link'
import Image from 'next/image'
import * as React from 'react'
import { SearchIcon, UserIcon } from '@/components/ui/Icons'
import { useAuth } from '@/hooks/useAuth'
import { getUserAvatarFallbackLetter, getUserAvatarUrl, getUserFirstInitialAndLastName } from '@/lib/userDisplay'
import { searchMockEpisodesAndClips } from '@/lib/search/mockSearch'

const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'The Show', href: '/the-show' },
  { label: 'The Podcast', href: '/podcast' },
  { label: 'Forums', href: '/forums' },
  { label: 'Store', href: '/store' },
] as const

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const { user, loading } = useAuth()

  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const searchWrapRef = React.useRef<HTMLDivElement | null>(null)
  const searchInputRef = React.useRef<HTMLInputElement | null>(null)

  const searchResults = React.useMemo(() => {
    if (!searchOpen) return []
    return searchMockEpisodesAndClips(searchQuery, 6)
  }, [searchOpen, searchQuery])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    if (!searchOpen) return
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [searchOpen])

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setSearchOpen(false)
      setSearchQuery('')
    }

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const wrap = searchWrapRef.current
      if (!wrap) return
      if (wrap.contains(e.target as Node)) return
      setSearchOpen(false)
    }

    if (searchOpen) {
      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('pointerdown', onPointerDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [searchOpen])

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
          <div ref={searchWrapRef} className="relative flex items-center gap-2">
            {searchOpen ? (
              <div className="hidden sm:block">
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search episodes & clips"
                  className="h-9 w-[240px] rounded border border-brand-gray-800 bg-brand-black px-3 text-sm text-brand-white outline-none placeholder:text-brand-white/60 focus:border-brand-red"
                  aria-label="Search episodes and clips"
                />

                {searchQuery.trim() ? (
                  <div className="absolute right-0 top-[44px] z-50 w-[360px] overflow-hidden rounded border border-brand-gray-800 bg-brand-black shadow-sm">
                    {searchResults.length ? (
                      <div className="divide-y divide-brand-gray-800">
                        {searchResults.map((r) => (
                          <div key={r.id} className="px-3 py-2">
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="truncate text-xs font-[800] uppercase tracking-wide text-brand-white/70">
                                  {r.scopeLabel} · {r.kindLabel}
                                </div>
                                <div className="truncate text-sm font-[800] text-brand-white">{r.title}</div>
                              </div>
                            </div>
                            <div className="mt-1 line-clamp-2 text-xs text-brand-white/75">{r.description}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 py-3 text-sm text-brand-white/80">No results.</div>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            <button
              type="button"
              aria-label={searchOpen ? 'Close search' : 'Search'}
              className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-brand-gray-900"
              onClick={() => {
                setSearchOpen((v) => !v)
                if (searchOpen) setSearchQuery('')
              }}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>

          {loading || !user ? (
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded border border-brand-gray-800 px-3 py-2 text-xs font-[800] uppercase tracking-wide hover:border-brand-red"
            >
              <UserIcon className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          ) : (
            (() => {
              const avatarUrl = getUserAvatarUrl(user)
              return (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded border border-brand-gray-800 px-3 py-2 text-xs font-[800] tracking-wide hover:border-brand-red"
              aria-label="Account"
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gray-900 text-[10px] font-[800] text-brand-white">
                  {getUserAvatarFallbackLetter(user)}
                </div>
              )}
              <span className="hidden sm:inline">{getUserFirstInitialAndLastName(user)}</span>
              <span className="sm:hidden">{getUserAvatarFallbackLetter(user)}</span>
            </Link>
              )
            })()
          )}
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
