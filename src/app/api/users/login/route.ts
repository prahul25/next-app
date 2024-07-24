import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists, Sign up first" },
        { status: 400 }
      );
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return NextResponse.json(
        { error: "Password does not match, try after come time" },
        { status: 400 }
      );
    }

    const payloadData = {
      id: user._id,
      username: user.username,
      password: user.password,
    };

    const jwtToken = Jwt.sign(payloadData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { sucess: true, message: "User successfully logged" },
      { status: 200 }
    );
    response.cookies.set("token", jwtToken, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
