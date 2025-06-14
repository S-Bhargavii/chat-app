import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async(req, res) => {
    try{
        const token = req.cookies.jwt; 

        if(!token){
            return res.status(401).json({message: "Unauthorized -  No token provided"})
        }
        // if token exists
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if(!decoded){
            return res.status(401).json({message : "Unauthorized - Invalid token provided"})
        }
        
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user // add the user info to the request body for the next methods to be able to use them
        next(); // move onto the next method  

    }catch(error){
        console.log(`Error occured in route protection : ${error}`);
        return res.status(500).json({message: "Internal server error"});
    
    }
}