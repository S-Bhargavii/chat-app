import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    // creating a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"});

    // add the token to the cookies in the response and send it 
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
     })
    
     return token;
}