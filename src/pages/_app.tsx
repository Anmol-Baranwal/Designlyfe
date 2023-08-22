import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'
import { AuthContextProvider } from '../../lib/firebase/context/AuthContext'

import AppComponent from './appComponent'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthPageProvider>
        <AppComponent>
          <Component {...pageProps} />
        </AppComponent>
      </AuthPageProvider>
    </AuthContextProvider>
  )
}
