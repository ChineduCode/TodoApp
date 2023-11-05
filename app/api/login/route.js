import { NextResponse } from "next/server"
import connectDatabase from "@/connectDB"
import User from "@/Models/User"
import bcrypt from "bcryptjs"

export async function POST(request){
    const res = await request.json()
    let {username, password} = res

    if(!username || !password){
        return new Response('Please fill all fields', {status : 401})
    }

    try {
        //connect to database
        await connectDatabase()

        //transform username to lowercase
        username = username.toLowerCase()

        const user = await User.findOne({username})

        //check if user does not exist
        if(!user){
            console.log('User does not exist')
            return new Response(`User does not exist`, {status : 401})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            console.log('Incorrect password')
            return new Response('Incorrect password', {status : 401})
        }

        return new Response('Login successful', {status: 200})

    } catch (error) {
        console.error(error)
    }

}