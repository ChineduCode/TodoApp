import { NextResponse } from "next/server"
import connectDatabase from "@/connectDB"

export async function POST(request){
    const res = await request.json()
    console.log(res)

    return NextResponse.json({res})
}