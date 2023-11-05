import connectDatabase from "@/connectDB";
import { User } from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request){
    const res = await request.json()
    const {username, password, confirmPassword} = res

    //Check for possible errors
    if(!username || !password || !confirmPassword){
        return new Response('Please fill in all fields', {status : 401})
    }

    if(password.length < 8){
        return new Response('Password must contain more than eight characters', {status : 401})
    }

    if(password !== confirmPassword){
       return new Response('Passwords do not match', {status : 401})
    }

    try {
        //connect to database
        await connectDatabase()

        //Check if user already exists
        const userExist = await User.findOne({username})
        if(userExist){
            return new Response('User already exists', {status : 400})
        }

        //hashPassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Register user
        const user = await User.create({
            username,
            password : hashedPassword
        })

        if(user){
            console.log(user)
            return new Response('User registered', {status : 200})

        }else{
            throw new Error('User not registered')
        }

    } catch (error) {
        console.error(error)
    }
}