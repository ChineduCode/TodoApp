'use client'

import { useState } from "react"

export default function CreateNewTodo(){
    const [text, setText] = useState('')

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
            }

        }catch (error) {
            console.log(error)
            throw new Error(error)
        }
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