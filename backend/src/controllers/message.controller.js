import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async(req, res) => {
    try{
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:userId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(error){
        console.error("Error in getUsersForSidebar: ", error.message);
        return res.status(500).json({error: "Internal server error occured"});
    }
}

export const getMessages = async(req, res) => {
    try{
        const {id: userToChatId} = req.params; // reciever id 
        const myId = req.user._id;

        // we want to get all the messages that happened between 
        // these 2 user ids.
        const messages = await Message.find({
            $or:[
                {senderId: myId, recieverId: userToChatId},
                {recieverId: myId, senderId: userToChatId}
            ]
        })
        res.status(200).json(messages);

    }catch(error){
        console.error("Error in getmessages: ", error.message);
        return res.status(500).json({error: "Internal server error occured"});
    }
}

export const sendMessage = async(req, res) => {
    try{
        const {id:toUserId} = req.params;
        const fromUserId = req.user._id;
        const {text, image} = req.body;

        let imageUrl;
        if(image){
            // upload image to cloudinary 
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: fromUserId, 
            recieverId: toUserId, 
            text: text,
            image: imageUrl
        })
        await newMessage.save(); // save to mongodb database

        // to do : socket.io
        
        return res.json(200).json(newMessage);
    }catch(error){
        console.error("Error occured while sending images: ", error.message);
        return res.status(500).json({error: "Internal server error occured"});
    }
}