'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export default function signinButton(){
    const {data : session} = useSession()

    if(session && session.user){
        return(
            <button onClick={()=> signOut()}></button>
        )
    }

    return(
        <button onClick={()=> signIn()}></button>
    )
}