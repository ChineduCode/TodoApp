import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import TodoList from "./TodoList"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { getToken } from 'next-auth/jwt'

// const fetchTodo = async ()=> {
//     const session = await getServerSession(authOptions)
//     const apiUrl = process.env.API_URL
//     const secret = process.env.NEXTAUTH_SECRET
//     const token = await getToken()

//     // if(session){
//     //     const response = await fetch(`${apiUrl}/api/todo`)
//     //     return response.json()
//     // }
//     return token
// }

export default function Todo(){
    // const token = await fetchTodo()
    // console.log(token)

    return(
        <main className="todo">
            <section className="container">
                <Header />
                <CreateNewTodo />
                <TodoList />
            </section>
        </main>
    )
}
