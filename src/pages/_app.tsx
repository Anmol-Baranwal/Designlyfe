import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthPageProvider } from '@/components/AuthPageContext'
import { AuthContextProvider } from '../../lib/firebase/context/AuthContext'
import { Toaster } from '../components/ui/toaster'
import Head from 'next/head'
import { ThemeProvider } from '../components/theme-provider'
import Script from 'next/script'

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

        <title>Designlyfe: Keep track of best resources</title>
      </Head>
      <AuthContextProvider>
        <AuthPageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={'light'}
            enableSystem={true}
          >
            <Component {...pageProps} />
            <Script
              src="https://scripts.simpleanalyticscdn.com/latest.js"
              async
              defer
              data-hostname="designlyfe.tech"
            />
            <noscript>
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="https://queue.simpleanalyticscdn.com/noscript.gif?hostname=designlyfe.tech"
                alt=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </noscript>
            <Toaster />
          </ThemeProvider>
        </AuthPageProvider>
      </AuthContextProvider>
    </>
  )
}
