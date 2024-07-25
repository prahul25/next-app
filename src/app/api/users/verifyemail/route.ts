import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connectDb()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        
        if(!token){
            return NextResponse.json({error:'No token is passed/provided'})
        }
        console.log('api me ana toh banta hai', token)
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        console.log('ye raha asli chor',user)
        if(!user){
            return NextResponse.json({error:'Invalid token'},{status:400})
        }

        user.isVarified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        return NextResponse.json({message:'Email verified successfully' , success:true},{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}