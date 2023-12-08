import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import TodoList from "./TodoList"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Todo(){
    const session = await getServerSession(authOptions)
    console.log(session)
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
