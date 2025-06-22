import {Server} from "socket.io";
import http from "http";
import express from "express";
import { SocketAddress } from "net";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

// used to store online users
const userSocketMap = {}; // {userId : socketId}

// client emo .connect() pilichinappudu 
// the server will get a "connection" event ala anamata 
// then the callback function that is passed inside 
// will be called anamata
io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);
    // send the user id in the query params along 
    // with the handshake made to upgrade to socket.io
    const userId = socket.handshake.query.userId;

    // add the newly connected user session to the Socketmap
    if(userId) userSocketMap[userId] = socket.id;

    // emit event to let all the clients connected to the server 
    // know about the onlineUsers
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};