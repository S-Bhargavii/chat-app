import express from "express" // this imports the express libary and the import is assigned to express variable 
import authRoutes from "./routes/auth.route.js" ;
import dotenv from "dotenv";

const app = express(); 
dotenv.config(); 

const port = process.env.PORT
app.use("/api/auth", authRoutes);

app.listen(
    port,
    ()=>{
        console.log(`server is running on port :` + port);
    }
)