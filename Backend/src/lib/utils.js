import jwt  from "jsonwebtoken"
export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"24h"} 
     )
     //to send token in cookies 
    res.cookie("jwt",token,{
        maxAge:24*60*60*1000, // 1 day in milliseconds
        httpOnly:true, // prevents XSS scripting 
    })
    return token
}