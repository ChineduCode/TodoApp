'use client'

import Header from "@/components/Header"
import CreateNewTodo from "@/components/CreateNewTodo"
import TodoList from "./TodoList"
import Loading from "./Loading"
import { useState, useEffect } from "react"

export default function Todo(){
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [notCompleted, setNotCompleted] = useState(0)
    
    useEffect(()=> {
        async function fetchTodos(){
            setLoading(true)
            const response = await fetch(`/api/todo`, {cache: 'no-store'})
            const data = await response.json()
            setTodos(data)
            setNotCompleted(data.filter(data => data.completed === false))
            setLoading(false)
        }

        fetchTodos()
    }, [])

    async function handleCompleted(id){
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'PUT'
        })

        if(res.ok){
            console.log(`todo deleted`)
        }else {
            throw new Error('error deleting todo')
        }
    }

    async function handleDelete(id){
        console.log(id)
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            console.log(`todo deleted`)
        }else {
            throw new Error('error deleting todo')
        }
    }

    function deleteAllCompleted(){
        console.log('all completed deleted')
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

    return(
        <main className="todo">
            <section className="container">
                <Header />
                <CreateNewTodo />

                { loading ? <Loading /> :

                    <section className="todos_container">
                        <div className="todos">
                            { todos.map((todo, index) => <TodoList key={index} todo={todo} onCompleted={handleCompleted} onDelete={handleDelete}/> )}
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
                    </section> 
                }

            </section>
        </main>
    )
}
