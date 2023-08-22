import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'
import { AuthContextProvider } from '../../lib/firebase/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthPageProvider>
        <Component {...pageProps} />
      </AuthPageProvider>
    </AuthContextProvider>
  )
}
