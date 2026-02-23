import type { AppProps } from 'next/app'

import '@/app/globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
