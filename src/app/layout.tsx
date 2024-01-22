import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amberflo exercise',
  description: 'Amberflo exercise'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
