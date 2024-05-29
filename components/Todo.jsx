import Header from "@/components/Header"
import Todos from "./Todos"

export default async function Todo(){
    return(
        <main className="todo">
            <section className="container">
                <Header />
                <Todos />
            </section>
        </main>
    )
}
