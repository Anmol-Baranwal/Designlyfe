import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'
import { AuthContextProvider } from '../../lib/firebase/context/AuthContext'
import { Toaster } from '../components/ui/toaster'
import AppComponent from './AppComponent'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <AppComponent>
    <AuthContextProvider>
      <AuthPageProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthPageProvider>
    </AuthContextProvider>
    // </AppComponent>
  )
}
