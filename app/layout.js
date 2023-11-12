import '../scss/globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin_sans = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'TODO APP',
  description: 'Track your day to day activities with our platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        {children}      
      </body>
    </html>
  )
}
