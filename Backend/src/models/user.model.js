import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        email:
        {
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        name:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
);
export const User=mongoose.model("User",userSchema)