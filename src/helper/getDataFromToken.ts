import { NextRequest } from "next/server";
import Jwt from 'jsonwebtoken';

export const getDataFromToken = (request:NextRequest) =>{
    try {
        const fetchedToken = request.cookies.get("token")?.value || ""
        // console.log(fetchedToken , "fetched token")
        const decodedToken:any = Jwt.verify(fetchedToken,process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}