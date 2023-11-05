import { NextResponse } from "next/server"
import connectDatabase from "@/connectDB"

export async function POST(request){
    const res = await request.json()

    return new Response('Login successful', res, {status : 200})
}