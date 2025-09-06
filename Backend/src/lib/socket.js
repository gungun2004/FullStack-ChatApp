import { Server } from "socket.io"
import express from "express"
import http from "http"

const app=express();
const server= http.createServer(app);
const io= new Server(server,{
    cors:
    {
        origin:["http://localhost:5173"],
        credentials:true
    }
});
//helper function for the real time message transferring 
export function getRecieverSocketId(userId){
  return userSocketMap[userId];    
  // so basically we made this function to populate the userId
};


//used to store online users
const userSocketMap={}  //{userId:socketId}
io.on("connection", (socket) => {
  console.log("A User Connected", socket.id);
  
  const userId=socket.handshake.query.userId;    //handshake means whne http server and web socket firstly exchanged and share some info
  if(userId)
    userSocketMap[userId]=socket.id;
   

  //send events to all the connected clients 
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A User disconnected", socket.id);
  delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});


export {app,server,io};