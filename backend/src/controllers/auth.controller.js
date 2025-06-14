import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are mandatory"})
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters"})
        }

        const user = await User.findOne({email:email});

        if(user){
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if(newUser){
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save(); // save to the users database
            res.status(201).json({
                _id: newUser._id, 
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }

    }catch(error){
        console.log(`Error occured during signup : ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const login = (req, res) => {
    try{

    }catch(error){
        console.log(`Error occured during login : ${error}`);
    }
}

export const logout = (req, res) => {
    try{

    }catch(error){
        console.log(`Error occured during logout : ${error}`);
    }
}