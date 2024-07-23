import mongoose from "mongoose";

export async function connectDb() {
    try {
        
        mongoose.connect(process.env.MONGO_URI || "Default mongo uri")
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("MongoDB Connected")
        })
        connection.on("error",(error)=>{
            console.log(error,"MongoDB connection error, please make sure db is up and running")
            process.exit(0)
        })
    } catch (error) {
        console.log(error,"Something went wrong while connection to DB")
    }
}