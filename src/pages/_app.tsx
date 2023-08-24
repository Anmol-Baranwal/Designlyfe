import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'
import { AuthContextProvider } from '../../lib/firebase/context/AuthContext'
import { Toaster } from '../components/ui/toaster'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Add your meta tags here */}
        <meta name="description" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />

        <title>UIVerse: Keep track of best resources</title>
      </Head>
      <AuthContextProvider>
        <AuthPageProvider>
          <Component {...pageProps} />
          <Toaster />
        </AuthPageProvider>
      </AuthContextProvider>
    </>
  )
}
