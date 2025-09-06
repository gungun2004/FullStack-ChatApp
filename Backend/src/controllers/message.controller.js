import cloudinary from "../lib/cloudinary.js"
import { getRecieverSocketId,io} from "../lib/socket.js"
import Message from "../models/message.model.js"
import { User } from "../models/user.model.js"

export const getUsersForSidebar=async(req,res)=>
{
 //get all users except ourselves
 try{
const loggedInUserId=req.user._id  //getting from protectRoute
const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")  //$ne means not equals to and 
res.status(200).json(filteredUsers)
 }  
 catch(error) 
 {
res.status(500).json({message:"Internal Server Error"})
 }
}
export const getMessages=async(req,res)=>
{
    try{
 const {id:userToChatId}= req.params          //id because used in routes /:id and renamed to userToChatId  id of whom we want to talk 
 const myId=req.user._id;
 //to get the messages between two users
const messages=await Message.find({
  $or:[                                        //$or is used to get array 
    { senderId:myId,receiverId:userToChatId},  //My messsages to reciever
    { senderId:userToChatId,receiverId:myId}   //reciever messages to me 
]})
res.status(200).json({messages})
    }
    catch(error)
    {
       res.status(500).json({message:"Internal Server Error"}) 
    }
}
export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
await newMessage.save();
//realtime web sockets will be implemented here
const  recieverSocketId =getRecieverSocketId(receiverId);
if(recieverSocketId)
{
  io.to(recieverSocketId).emit("newMessage",newMessage)
}

res.status(201).json(newMessage)
}
    catch(error)
    {
 res.status(500).json({message:"Internal Server Error"+error})
    }
}
