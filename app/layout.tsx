import './globals.css'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'STEM Znanje Warmup',
  description: '5-dnevno natjecanje iz matematike, programiranja i CTF-a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  )
}

