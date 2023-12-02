import Todos from "@/components/Todos"

async function fetchTodos(){
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/api/todo`)
    const todos = await response.json()
    return todos;
}

export default async function TodoPage(){
    return(
        <Todos />
    )
}