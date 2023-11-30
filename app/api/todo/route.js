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
    console.log(res)

    return NextResponse.json({res})
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
    

    //GET TODO IF AUTHORIZED
    const todo = {
        text: 'I will go to america next year',
        completed: false
    }

    return NextResponse.json(todo)
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