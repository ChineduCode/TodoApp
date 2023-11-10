import Providers from "@/components/Providers"

export default function TodoLayout({children}){
    return(
        <Providers> {children} </Providers>
    )
}