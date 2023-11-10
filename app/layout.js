'use client'
import '../scss/globals.css'
import { Josefin_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'TODO APP',
  description: 'Todo App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
