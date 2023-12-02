import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import Todo from "./Todo"

export default async function TodoList(){
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
