import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unqiue: true
        }, 
        fullName: {
            type: String,
            required: true
        },
        password: {
            type: String, 
            required: true,
            minLength: 6
        },
        profilePic: {
            type: String, 
            default: ""
        }
    },
    {timestamps:true}
    // this will automatically add createdAt and updatedAt fields --> best practice
)

const User = mongoose.model("User", userSchema);

export default User;