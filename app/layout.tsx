import './globals.css'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'STEM ZNANJE WARMUP',
  description: '5-dnevno natjecanje iz matematike, programiranja i CTF-a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

