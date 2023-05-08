import '@/styles/globals.css'
import { Montserrat } from "next/font/google"
import Head from "next/head"
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react'

// Custom font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
});

// App component
export default function App({ Component, pageProps }) {
  // Router
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
        <NavBar />
        {/* AnimatePresence is used to animate page transitions */}
        <AnimatePresence mode="wait">
          {/* Display page based on router path */}
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
      <Analytics />
    </>
  )

}
