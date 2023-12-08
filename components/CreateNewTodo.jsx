'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreateNewTodo(){
    const {data: session} = useSession()
    const [text, setText] = useState('')
    const router = useRouter()

    console.log(session)

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
            throw new Error(error.message)
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