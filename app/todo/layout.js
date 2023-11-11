'use client'

import { SessionProvider } from "next-auth/react"

export default function TodoLayout({children}){
    return(
        <SessionProvider> {children} </SessionProvider>
    )
}