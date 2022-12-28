import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>yo whats up</title>
        </Head>
        <div className="text-green">
          <h1 className="text-white font-bold">
            faka
          </h1>
        </div>
      </div>
    </>
  )
}