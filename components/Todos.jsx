import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import Todo from "./Todo"

async function fetchTodos(){
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/api/todo`)
    const todos = await response.json()
    return todos;
}
export default async function Todos(){
    return( 
        <main className="todo">
            <section className="container">
                <Header />
                <CreateNewTodo />
                <Todo />
            </section>
        </main>
    )
}
