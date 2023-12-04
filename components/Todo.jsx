import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import TodoList from "./TodoList"

export default function Todo(){

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
