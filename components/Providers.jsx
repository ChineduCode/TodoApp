'use client'

import { SessionProvider } from 'next-auth/react' 

export default function Providers({children}){
    <SessionProvider> {children} </SessionProvider>
}