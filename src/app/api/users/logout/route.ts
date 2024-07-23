import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "User successfully logout", success: true },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}
