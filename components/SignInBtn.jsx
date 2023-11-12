'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function SignInBtn(){
    const {data: session} = useSession()

    if(session && session.user){
        return(
            <button className="signout-btn" onClick={()=> signOut()}>Logout</button>
        )
    }

    return(
        <button className="signin-btn" onClick={()=> signIn()}>Login</button>
    )
}