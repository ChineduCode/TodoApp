import Todo from "@/Models/Todo";
import User from "@/Models/User";

export async function POST(request){
    const res = await request.json()
    console.log(res)
    return NextResponse.json({res})
}