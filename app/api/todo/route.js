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
        user: session.user.id
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
    const todos = await Todo.find({ user: session.user.id }, {__v:0})
    return NextResponse.json(todos)   
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
    return NextResponse.json({msg: 'Todo deleted'})
}