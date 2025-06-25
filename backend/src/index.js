// this is the entry point of our app

import express from "express"
import authRoutes from "./routes/auth.route.js" ;
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.js";
import path from "path";

dotenv.config(); 

const port = process.env.PORT
const __dirname = path.resolve(); // returns the current directory path

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // frontend uri
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
}

server.listen(
    port,
    ()=>{
        console.log(`server is running on port :` + port);
        connectDB();
    }
)