import express from "express" // this imports the express libary and the import is assigned to express variable 
import authRoutes from "./routes/auth.route.js" ;

const app = express(); 

app.use("/api/auth", authRoutes);

app.listen(
    5001,
    ()=>{
        console.log("server is running on port 5001");
    }
)