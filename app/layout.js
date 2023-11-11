import '../scss/globals.css'
import { Josefin_Sans } from 'next/font/google'
import Providers from '@/components/Providers'

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'TODO APP',
  description: 'Todo App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
