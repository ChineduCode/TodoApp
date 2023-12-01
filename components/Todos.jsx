'use client'

import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import Todo from "./Todo"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Todos(){
    let [todos, setTodos] = useState([])
    
    //Fetch todo
    useEffect(() => {
        const getTodos = async ()=> {
            const res = await fetch('/api/todo', { next: { revalidate: 10 } })
            const data = await res.json()
            setTodos(data)
        }

        getTodos()
    }, []) 
    console.log(todos)

    function handleCompleted(id){
        setTodos(
            todos.map(todo =>
                todo.text.toLowerCase() === id.toLowerCase() ? {...todo, completed : true} : todo
            )
        )
    }

    function handleDelete(id){
        setTodos(todos.filter(todo => todo.text.toLowerCase() !== id.toLowerCase()))
    }
    
    function deleteAllCompleted(){
        setTodos(todos.filter(todo => !todo.completed))
    }
    
    function getAll(){
        console.log('All')
    }
    
    function filterActive(){
        console.log('Active')
    }
    
    function filterCompleted(){
        console.log('Completed')
    }
    
    //filter and get the length of todo.completed === false 
    const notCompleted = todos.filter(todo => !todo.completed)

    return( 
        <main className="todo">
            <section className="container">
                <Header />
                <CreateNewTodo />
                {todos.length > 0 ? 
                    <section className="todos_container">
                        <div className="todos">
                            {todos.map((todo, index) => <Todo todo={todo} key={index} onComplete={handleCompleted} onDelete={handleDelete}/> )}
                        </div>

                        <div className="bottom">
                            <span className="items_left">{notCompleted.length} items left</span>
                            <div className="filter">
                                <span className="all" onClick={getAll}>All</span>
                                <span className="active" onClick={filterActive}>Active</span>
                                <span className="completed" onClick={filterCompleted}>Completed</span>
                            </div>
                            <span className="clear_completed" onClick={deleteAllCompleted}>Clear Completed</span>
                        </div>
                   </section>  :  <span className="add_new_todo_text">Add Todo </span> 
                }
            </section>
        </main>
    )
}
