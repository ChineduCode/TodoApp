import Login from "@/components/Login"

export default function LoginPage(){
    const apiUrl = process.env.API_URL
    
    return(
        <Login callbackUrl={apiUrl}/>
    )
}