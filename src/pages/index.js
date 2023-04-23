import Image from 'next/image'
import { Inter } from 'next/font/google'
import Opening from "./components/Opening"

import Three from './components/Three'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Opening/>
    <Three/>
    </>
  )
}
