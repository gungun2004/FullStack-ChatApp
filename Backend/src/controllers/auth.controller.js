import { User } from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
export const signup = async(req, res) => {
  const {name,email,password}=req.body
  try{
    if(!name||!email||!password)
      return res.status(400).json({message:"All fields are required"})
if(password.length<6)
    return res.status(400).json({message:"Password must be atleast 6 characters long"}) //validate password
  const user = await User.findOne({email})
  if(user) return res.status(400).json({message:"Email already exits"});//validate email
//for hashing the password
const salt=await bcrypt.genSalt(10);
const hashedpassword=await bcrypt.hash(password,salt)

const newuser = new User({
name:name,
password:hashedpassword,
email
})
if(newuser)
{
//generate jwt token here
generateToken(newuser._id,res)
await newuser.save()
res.status(201).json({
    message:"User created successfully",
    _id:newuser._id,
    name:newuser.name,
    email:newuser.email,
    profilePic:newuser.profilePic

})
}
else{
    return res.status(400).json({message:"Failed to create user"})//if user is
}
}

  catch(error)
  {
res.status(500).json({message:`Internal Server Error ${error}`})
  }
};

export const login = async(req, res) => {
     const {email,password}=req.body
     try{
    if(!email||!password)
      return res.status(400).json({message:"Email and password both are required"})
    const user=await User.findOne({email})
if(!user)
  return res.status(400).json({message:"Invalid credentials"})   //if email not exist
const isPasswordCorrect=await bcrypt.compare(password,user.password)
if(!isPasswordCorrect)
return res.status(400).json({message:"Invalid credentials"})
//generate jwt token 
generateToken(user._id,res)
res.status(200).json({message:"User Successfully Logged in",
  _id:user._id,
    name:user.name,
    email:user.email,
    profilePic:user.profilePic
})
     }
     catch(error){
res.status(500).json({message:"Internal Server Error"})
     }
};

export const logout = (req, res) => {
    //here in logout we only do is to clear the cookies;
    try{
  res.cookie("jwt","",{maxAge:0})
  res.status(200).json({message:"Logged out successfully"})
    }
    catch(error)
    {
      res.status(500).json({message:"Internal Server Error"})
    }
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      return res.status(400).json({ message: "Profile Pic is required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    if (!uploadResponse)
      return res.status(400).json({ message: "Could not upload profile pic" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json({
      message: "User profile pic successfully updated",
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};
export const checkAuth=(req,res)=>{    //going to call this function each time refresh
  try{
    res.status(200).json(req.user)
  }
  catch(error)
  {
    res.status(500).json({message:"Internal Server Error"})
  }
};
