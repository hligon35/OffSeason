import { AccountSettingsClient } from '@/components/account/AccountSettingsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your Off Season account settings, sign-in methods, and access.',
  alternates: { canonical: '/account' },
  robots: { index: false, follow: false },
}

export default function AccountPage() {
  return (
    <AccountSettingsClient />
  )
}
