'use client'

import TodoList from "./TodoList"
import AddTodoBtn from "./AddTodoBtn"
import { useState } from "react"

const Todos = ()=> {
    const [text, setText] = useState('')
    const [todoAdded, setTodoAdded] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        if(!text){
            alert('The input field is empty')
            return
        }

        try{
            const res = await fetch('/api/todo', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text})
            })

            if(res.ok){
                setText('')
                setTodoAdded(true)
            }

        }catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }


    return(
        <div className="container">
            <form className="create_new_todo" onSubmit={handleSubmit}>
                <div className="control">
                    <input 
                        type="text" 
                        name="text" 
                        value={text}
                        onChange={(e)=> setText(e.target.value)}
                        placeholder="Create a new todo..."
                    />

                    <AddTodoBtn />
                </div>
            </form>

            <TodoList todoAdded={todoAdded} setTodoAdded={setTodoAdded} />
        </div>
    )
}

export default Todos
