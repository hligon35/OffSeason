'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useEntitlements } from '@/hooks/useEntitlements'
import { getUserAvatarFallbackLetter, getUserAvatarUrl, getUserFirstInitialAndLastName } from '@/lib/userDisplay'

type SectionId = 'overview' | 'library' | 'billing' | 'security' | 'notifications' | 'support'

const sections: Array<{ id: SectionId; label: string; description: string }> = [
  { id: 'overview', label: 'Overview', description: 'Profile and membership details.' },
  { id: 'library', label: 'Library', description: 'Your unlocked content and purchases.' },
  { id: 'billing', label: 'Billing', description: 'Subscription and payment settings.' },
  { id: 'security', label: 'Security', description: 'Sign-in methods and sessions.' },
  { id: 'notifications', label: 'Notifications', description: 'Email preferences.' },
  { id: 'support', label: 'Support', description: 'Help, policies, and account help.' },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function SettingCard({
  title,
  subtitle,
  children,
  id,
  hideHeading = false,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  id: SectionId
  hideHeading?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-20 rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
      {hideHeading ? null : (
        <>
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Settings</div>
          <h2 className="mt-1 text-2xl font-[800] tracking-tightish">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-brand-gray-700">{subtitle}</p> : null}
        </>
      )}
      <div className={hideHeading ? 'space-y-5' : 'mt-5 space-y-5'}>{children}</div>
    </section>
  )
}

function useLocalBoolean(key: string, defaultValue: boolean) {
  const [value, setValue] = React.useState(defaultValue)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(key)
    if (raw == null) return
    setValue(raw === 'true')
  }, [key])

  const setAndPersist = React.useCallback(
    (next: boolean) => {
      setValue(next)
      if (typeof window === 'undefined') return
      window.localStorage.setItem(key, String(next))
    },
    [key]
  )

  return [value, setAndPersist] as const
}

export function AccountSettingsClient() {
  const { user, loading, signInDev, signOut } = useAuth()
  const { entitlements, loading: entitlementsLoading } = useEntitlements()

  const [devUserId, setDevUserId] = React.useState('dev_user_123')
  const [devEmail, setDevEmail] = React.useState('dev@off-season.io')

  const [emailDrops, setEmailDrops] = useLocalBoolean('offseason.pref.emailDrops', true)
  const [emailNewEpisodes, setEmailNewEpisodes] = useLocalBoolean('offseason.pref.emailNewEpisodes', true)
  const [emailCommunity, setEmailCommunity] = useLocalBoolean('offseason.pref.emailCommunity', false)

  const isSignedIn = Boolean(user)
  const allAccess = entitlements.some((e) => e.productId === 'sub:all-access')

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'overview':
        return (
          <SettingCard
            id="overview"
            title="Overview"
            subtitle="Basic profile details and current membership status."
            hideHeading
          >
            <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4">
              <div className="flex items-center gap-3">
                {isSignedIn && getUserAvatarUrl(user) ? (
                  <Image
                    src={getUserAvatarUrl(user) ?? ''}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-sm font-[800] text-brand-white">
                    {isSignedIn ? getUserAvatarFallbackLetter(user) : '—'}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="truncate text-sm font-[800] text-brand-black">
                    {isSignedIn ? getUserFirstInitialAndLastName(user) : 'Not signed in'}
                  </div>
                  <div className="truncate text-xs text-brand-gray-600">
                    {isSignedIn ? user?.email ?? '—' : '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="User">
                <div className="rounded border border-brand-gray-200 bg-brand-gray-50 px-3 py-2 text-sm">
                  {isSignedIn ? user?.userId : '—'}
                </div>
              </Field>
              <Field label="Email">
                <div className="rounded border border-brand-gray-200 bg-brand-gray-50 px-3 py-2 text-sm">
                  {isSignedIn ? user?.email ?? '—' : '—'}
                </div>
              </Field>
            </div>

            <Field label="Membership">
              <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4 text-sm text-brand-gray-700">
                {entitlementsLoading ? (
                  'Loading…'
                ) : allAccess ? (
                  <span>
                    <span className="font-[800]">All-Access</span> subscription active.
                  </span>
                ) : (
                  <span>
                    <span className="font-[800]">Free</span> — subscribe to unlock all seasons.
                  </span>
                )}
              </div>
            </Field>
          </SettingCard>
        )

      case 'library':
        return (
          <SettingCard
            id="library"
            title="Library"
            subtitle="Your entitlements and order history will appear here."
            hideHeading
          >
            <Field label="Entitlements">
              <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4 text-sm">
                {loading ? (
                  'Sign in to load entitlements.'
                ) : entitlementsLoading ? (
                  'Loading…'
                ) : entitlements.length ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {entitlements.map((e) => (
                      <li key={e.productId}>
                        <span className="font-[800]">{e.productId}</span>
                        {e.source ? <span className="text-brand-gray-600"> · {e.source}</span> : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'None yet.'
                )}
              </div>
            </Field>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/media"
                className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
              >
                Browse Media
              </Link>
              <Link
                href="/checkout/success"
                className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black"
              >
                View Checkout Success
              </Link>
            </div>
          </SettingCard>
        )

      case 'billing':
        return (
          <SettingCard
            id="billing"
            title="Billing"
            subtitle="Manage your subscription and payment method (Stripe)."
            hideHeading
          >
            <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4 text-sm text-brand-gray-700">
              Stripe billing portal will be connected once Stripe keys + webhook fulfillment are live.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled
                className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white opacity-50"
              >
                Manage subscription
              </button>
              <button
                type="button"
                disabled
                className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black opacity-50"
              >
                Update payment method
              </button>
            </div>

            <div className="text-xs text-brand-gray-600">
              Note: this project uses Stripe Checkout + webhooks (and Stripe Connect) for fulfillment.
            </div>
          </SettingCard>
        )

      case 'security':
        return (
          <SettingCard
            id="security"
            title="Security"
            subtitle="Sign-in methods, sessions, and account controls."
            hideHeading
          >
            <Field label="Sign-in method">
              <div className="rounded border border-brand-gray-200 bg-brand-gray-50 px-3 py-2 text-sm">
                {isSignedIn ? user?.provider ?? '—' : '—'}
              </div>
            </Field>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => signOut()}
                disabled={!isSignedIn}
                className={`rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white ${
                  isSignedIn ? '' : 'opacity-50'
                }`}
              >
                Sign out
              </button>

              <button
                type="button"
                disabled
                className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black opacity-50"
              >
                Delete account
              </button>
            </div>

            <div className="text-xs text-brand-gray-600">
              Account deletion will be implemented once Firebase Auth + Firestore user records are connected.
            </div>
          </SettingCard>
        )

      case 'notifications':
        return (
          <SettingCard
            id="notifications"
            title="Notifications"
            subtitle="Choose what emails you want to receive."
            hideHeading
          >
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={emailNewEpisodes}
                  onChange={(e) => setEmailNewEpisodes(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-brand-gray-700">
                  <span className="font-[800] text-brand-black">New episodes</span>
                  <span className="block text-xs text-brand-gray-600">Get notified when new episodes drop.</span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={emailDrops}
                  onChange={(e) => setEmailDrops(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-brand-gray-700">
                  <span className="font-[800] text-brand-black">Merch drops</span>
                  <span className="block text-xs text-brand-gray-600">Drop alerts, restocks, and shipping updates.</span>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={emailCommunity}
                  onChange={(e) => setEmailCommunity(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-brand-gray-700">
                  <span className="font-[800] text-brand-black">Community replies</span>
                  <span className="block text-xs text-brand-gray-600">Mentions, replies, and updates on your posts.</span>
                </span>
              </label>
            </div>

            <div className="text-xs text-brand-gray-600">
              Preferences are stored locally for now (until user profiles are persisted).
            </div>
          </SettingCard>
        )

      case 'support':
        return (
          <SettingCard
            id="support"
            title="Support"
            subtitle="Help and account support."
            hideHeading
          >
            <div className="rounded border border-brand-gray-200 bg-brand-gray-50 p-4 text-sm text-brand-gray-700">
              For support, contact{' '}
              <a className="font-[800] text-brand-red hover:text-brand-black" href="mailto:support@off-season.io">
                support@off-season.io
              </a>
              .
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/forums"
                className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black hover:border-brand-red"
              >
                Visit Forums
              </Link>
              <Link
                href="/"
                className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
              >
                Back to Home
              </Link>
            </div>

            <div className="text-xs text-brand-gray-600">Terms/Privacy pages can be added when legal copy is ready.</div>
          </SettingCard>
        )

      default:
        return null
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Account</div>
        <h1 className="mt-1 text-3xl font-[800] tracking-tightish sm:text-4xl">Settings</h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-gray-700 sm:text-base">
          Manage your profile, subscription, and preferences.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/media"
            className="rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
          >
            Browse Media
          </Link>
          <Link
            href="/merch"
            className="rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black"
          >
            Browse Merch
          </Link>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-4">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Menu</div>

          <div className="mt-3 space-y-2">
            {sections.map((s) => (
              <details key={s.id} className="group rounded border border-brand-gray-200 bg-brand-white">
                <summary className="flex cursor-pointer list-none items-start gap-2 px-3 py-2 text-sm font-[800] tracking-tightish text-brand-black hover:text-brand-black [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block text-brand-gray-600 transition-transform group-open:rotate-90"
                  >
                    ▸
                  </span>
                  <div className="min-w-0 flex-1">
                    <div>{s.label}</div>
                    <div className="mt-1 text-xs font-[400] text-brand-gray-600">{s.description}</div>
                  </div>
                </summary>
                <div className="px-3 pb-3">
                  {renderSection(s.id)}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-4 rounded border border-brand-gray-200 bg-brand-gray-50 p-3 text-sm text-brand-gray-700">
            {loading ? (
              'Checking sign-in…'
            ) : isSignedIn ? (
              <div className="space-y-2">
                <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Signed in</div>
                <div>
                  <span className="font-[800]">User ID:</span> {user?.userId}
                </div>
                {user?.email ? (
                  <div>
                    <span className="font-[800]">Email:</span> {user.email}
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="mt-2 w-full rounded bg-brand-black px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-white"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Not signed in</div>
                <div className="text-sm text-brand-gray-700">Sign in to see entitlements and billing details.</div>
                <Link href="/login" className="inline-flex text-sm font-[800] text-brand-red hover:text-brand-black">
                  Go to Login
                </Link>

                {process.env.NODE_ENV === 'development' ? (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Dev sign-in</div>
                    <input
                      value={devUserId}
                      onChange={(e) => setDevUserId(e.target.value)}
                      className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm"
                      placeholder="dev user id"
                    />
                    <input
                      value={devEmail}
                      onChange={(e) => setDevEmail(e.target.value)}
                      className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-sm"
                      placeholder="dev email (optional)"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const id = devUserId.trim()
                        if (!id) return
                        await signInDev(id, devEmail.trim() || undefined)
                        window.location.reload()
                      }}
                      className="w-full rounded border border-brand-gray-200 bg-brand-white px-3 py-2 text-xs font-[800] uppercase tracking-wide text-brand-black hover:border-brand-red"
                    >
                      Continue as dev user
                    </button>
                    <div className="text-xs text-brand-gray-600">
                      Requires server env <span className="font-[800]">OFFSEASON_DEV_BYPASS_AUTH=true</span> for API calls.
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
