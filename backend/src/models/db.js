import mongoose from "mongoose";

export const connectDB = async() => {
    // asynchronous function as it takes time
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error){
        console.log(`An error occured while connecting to the database: ${error}`);
    }
}