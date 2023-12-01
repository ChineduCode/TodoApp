'use client'

import { useState } from "react"

export default function CreateNewTodo({addNewTodo}){
    const [text, setText] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        if(!text){
            alert('The input field is empty')
            return
        }

        // let reminder = false
        // const id = Math.floor(Math.random() * 100 * 0.1)

        const todo = {
            text
        }

        addNewTodo(todo)

        //clear text
        setText('')
    }

    return(
        <form action="" className="create_new_todo" onSubmit={handleSubmit}>
            <div className="control">
                <input 
                    type="text" 
                    name="text" 
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                    placeholder="Create a new todo..."
                />
            </div>
        </form>
    )
}