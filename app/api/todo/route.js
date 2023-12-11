import { NextResponse } from 'next/server';
import Todo from "@/Models/Todo";
import connectDatabase from "@/connectDB";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

//POST NEW TODO
export async function POST(request){
    const session = await getServerSession(authOptions)
    //CHECK IF USER IS AUTHORIZED
    if(!session || !session.user){
        return new Response(
            JSON.stringify({msg: 'Unauthorized'}), 
            {status: 401}
        )
    }
    

    //CREATE TODO IF AUTHORIZED
    const res = await request.json()
    const { text } = res
    if(!text){
        return new Response(
            JSON.stringify({msg: 'Fill all fields'}),
            {status: 400}
        )
    }

    //connect to database
    await connectDatabase()

    const todo = await Todo.create({
        text,
        user: session.user.sub
    })

    return NextResponse.json(todo)
}


//GET TODO
export async function GET(){
    const session = await getServerSession(authOptions)
    //CHECK IF USER IS AUTHORIZED
    if(!session || !session.user){
        return new Response(
            JSON.stringify({msg: 'Unauthorized'}), 
            {status: 401}
        )
    }
        

    //connect to db
    await connectDatabase()

    //GET TODO IF AUTHORIZED
    let todos = await Todo.find({ user: session.user.sub }, {__v:0})
    todos = todos.reverse() //let the latest todo appear on top
    return NextResponse.json(todos)   
}


//UPDATE TODO
export async function PUT(request){
    const session = await getServerSession(authOptions)
    //CHECK IF USER IS AUTHORIZED
    if(!session || !session.user){
        return new Response(
            JSON.stringify({msg: 'Unauthorized'}), 
            {status: 401}
        )
    }


    //UPDATE IF AUTHORIZED
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    //connect to database
    await connectDatabase()

    const completedTodo = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true })

    if(completedTodo){
        console.log('todo completed')
        return NextResponse.json({msg: 'Todo completed'})

    }else{
        throw new Error('Todo not completed')
    }

}


//DELETE TODO
export async function DELETE(request){
    const session = await getServerSession(authOptions)
    //CHECK IF USER IS AUTHORIZED
    if(!session || !session.user){
        return new Response(
            JSON.stringify({msg: 'Unauthorized'}), 
            {status: 401}
        )
    }

    
    //DELETE IF AUTHORIZED
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    //connect to database
    await connectDatabase()
    
    //Delete for a particular id
    if(id){
        const deletedTodo = await Todo.findByIdAndDelete(id)

        if(deletedTodo){
            console.log('Todo deleted', id)
            return NextResponse.json({msg: 'Todo deleted'})
    
        }else{
            throw new Error('Cant delete todo try again later')
        }
    }

    //Delete all completed todo
    const deletedCompletedTodos = await Todo.deleteMany({completed: true})
    if(deletedCompletedTodos){
        console.log('completed todos cleared')
        return NextResponse.json({msg: 'Todo deleted'})
        
    }else {
        throw new Error('Failed to delete the completed todos')
    }
}