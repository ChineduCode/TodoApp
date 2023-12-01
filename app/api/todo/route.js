import { NextResponse } from 'next/server';
import Todo from "@/Models/Todo";
import User from "@/Models/User";
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

    try {
        //connect to database
        await connectDatabase()

        const todo = await Todo.create({
            text,
            user: session.user.id
        })

        console.log({todo})
        return NextResponse.json({todo})

    } catch (error) {
        console.log(error)
    }

}


//GET TODO
export async function GET(request){
    const session = await getServerSession(authOptions)
    //CHECK IF USER IS AUTHORIZED
    if(!session || !session.user){
        return new Response(
            JSON.stringify({msg: 'Unauthorized'}), 
            {status: 401}
        )
    }

    try {
        //connect to db
        await connectDatabase()

        //GET TODO IF AUTHORIZED
        const todos = await Todo.find({ user: session.user.id }, {__v:0})
        console.log(todos)
        return NextResponse.json(todos)
    } catch (error) {
        console.log(error)
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
    return NextResponse.json({msg: 'Todo deleted'})
}