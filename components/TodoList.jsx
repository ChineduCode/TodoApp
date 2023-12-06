'use client'

import Loading from "./Loading"
import { useState, useEffect } from "react"

export default function TodoList(){
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [notCompleted, setNotCompleted] = useState(0)
    
    useEffect(()=> {
        async function fetchTodos(){
            setLoading(true)
            const response = await fetch(`/api/todo`, { cache : 'no-store' })
            const data = await response.json()
            setTodos(data)
            console.log(todos)
            setNotCompleted(data.filter(data => data.completed === false))
            setLoading(false)
        }

        fetchTodos()
    }, [])
    
    //complete a todo
    async function handleCompleted(id){
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'PUT'
        })

        if(res.ok){
            //fetch todo
            const res = await fetch('/api/todo', {cache: 'no-store'})
            const data = await res.json()
            setTodos(data)

        }else {
            throw new Error('error deleting todo')
        }
    }
    
    //delete a todo
    async function handleDelete(id){
        console.log(id)
        const res = await fetch(`/api/todo?id=${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            //fetch todo
            const res = await fetch('/api/todo', {cache: 'no-store'})
            const data = await res.json()
            setTodos(data)

        }else {
            throw new Error('error clearing todo')
        }
    }
    
    //clear completed todos
    async function clearCompleted(){
        const res = await fetch('/api/todo', {
            method: 'DELETE'
        })

        if(res.ok){
            const res = await fetch('/api/todo', {cache: 'no-store'})
            const data = await res.json()
            setTodos(data)
        }else{
            throw new Error('error clearing completed todo')
        }
    }
    
    //Get all todos
    async function filterAll(){
        const res = await fetch('/api/todo', {cache: 'no-store'})
        const data = await res.json()
        console.log(data)
        //setTodos(data)
    }
    
    //Get active todos
    async function filterActive(){
        const res = await fetch('/api/todo', {cache: 'no-store'})
        const data = await res.json()
        const activeTodo = data.filter(d => d.completed === false)
        console.log(activeTodo)
        // setTodos(activeTodo)
    }
    
    //Get completed todos
    async function filterCompleted(){
        const res = await fetch('/api/todo', {cache: 'no-store'})
        const data = await res.json()
        const completedTodo = data.filter(d => d.completed === true)
        console.log(completedTodo)
    }


    if(todos.length < 1){
        return( 
            <>
                { loading ? <Loading /> :
                    <div className="no-todo">No to-do available</div>
                }
            </> 
        )
    }

    return(
        <>
            { loading ? <Loading /> : 

                <section className="todos_container">
                    <div className="todos">
                        { todos.map((todo, index)=> (
                            <div className="todo" key={index}>
                                <div className={`left ${todo.completed ? 'completed' : 'left'}`}>
                                    <span className="checkbox" onClick={() => handleCompleted(todo._id)}>
                                        <img src="./icon-check.svg" alt="check" className="icon-check"/>
                                    </span>
                                    <span className="text">{todo.text}</span>
                                </div>
                                <img src="./icon-cross.svg" alt="cross" className="icon-cross" onClick={()=> handleDelete(todo._id)}/>
                            </div>
                        ))}
                    </div>

                    <div className="bottom">
                        <span className="items_left">{notCompleted.length} items left</span>
                            <div className="filter">
                                <span className="all" onClick={filterAll}>All</span>
                                <span className="active" onClick={filterActive}>Active</span>
                                <span className="completed" onClick={filterCompleted}>Completed</span>
                            </div>
                        <span className="clear_completed" onClick={clearCompleted}>Clear Completed</span>
                    </div>
                </section>
            }
        </>
    )
}
