import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const protectRoute=async(req,res,next)=>
{
    try{
const token =req.cookies.jwt                         //step 1- get token from cookie
if(!token)
return res.status(401).json({message:"Unauthorized -No Token Provided"})
//to verify the token
const decoded=jwt.verify(token,process.env.JWT_SECRET)      //step 2- verify token
if(!decoded)
    return res.status(401).json({message:"Token is invalid"})
const user=await User.findById(decoded.userId).select("-password") //step 3- to select all fields except password
if(!user) return res.status(404).json({message:"User not found"})
req.user=user
next()    //update profile
}
catch(error)
{
    console.error("❌ protectRoute Error:", error); 
res.status(500).json({message:"Internl Server error"+error})
}
}

