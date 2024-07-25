import { connectDb } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDb()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        
        const user = await User.findOne({email})
        
        if(!user){
            throw new Error('User not found')
        }
        await sendEmail({ email, emailType: "RESET", userId: user._id });
        return NextResponse.json(user)
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}