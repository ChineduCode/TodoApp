import Login from "@/components/Login"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function LoginPage(){
    const session = await getServerSession()
    //console.log(session)

    if(session){
        redirect('/todo')
    }

    return(
        <Login />
    )
}