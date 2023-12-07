import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import TodoList from "./TodoList"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Todo(){
    // const session = await getServerSession(authOptions)
    // const apiUrl = process.env.API_URL
    // if(session){
    //     const res = await fetch(`${apiUrl}/api/todo`, {})
    //     const data = await res.json()
    //     console.log(data)
    // }

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
