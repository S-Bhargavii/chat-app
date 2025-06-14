import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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
            res.status(200).json({
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

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({message: "No user exists with that email"});
        }

        // is user exists 
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword){
            return res.status(400).json({message: "Incorrect password"})
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id, 
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    }catch(error){
        console.log(`Error occured during login : ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const logout = (req, res) => {
    try{
        // we are deleting the jwt cookie by first assigning it a blank value
        // and then making use of the maxage = 0 to delete itself
        // once it is expired
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.log(`Error occured during logout : ${error}`);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async(req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id; // the user has been added into the request body by the protect route middleware 

        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"});
        }

        // cloudinary is simply like a bucket that stores the images
        // the link to the image will be saved in the mongodb database
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true});
        return res.status(200).json(updatedUser);
        
    } catch(error){
        console.log("An error occured when uploading profile picture");
        return res.status(500).json({message: "Internal server error occured."});

    }
}