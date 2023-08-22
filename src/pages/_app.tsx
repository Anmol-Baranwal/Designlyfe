import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthPageProvider>
      <Component {...pageProps} />
    </AuthPageProvider>
  )
}
