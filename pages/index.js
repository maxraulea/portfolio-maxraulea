import Head from 'next/head'
import { Inter } from '@next/font/google'
import TestText from '../components/TestText'
import Contact from '../components/Contact'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Max Răulea</title>
        </Head>
        <TestText/>
        <Contact/>
      </div>
    </>
  )
}
