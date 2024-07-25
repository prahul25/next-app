import { connectDb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDb()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({message:'Invalid Token'} ,{status:400})
        }
    
        return NextResponse.json({message:'Successfully user data fetched' , data:user})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}