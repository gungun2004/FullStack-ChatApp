import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

export const useAuthStore=create((set,get)=>({
authUser:null,
isSigningUp:false,
isLoggingIn:false,
isUpdatingProfile:false,
onlineUsers:[],
isCheckedAuth:true,     //unless refresh
socket :null,

BASE_URL:import.meta.env.MODE==="development"? "http://localhost:5000/api":"/",

checkAuth:async ()=>{
    try{
        const res=await axiosInstance.get("/auth/check");  
        set({authUser:res.data})
        get().connectSocket();
    }
    catch(error)
    {   console.log("Error in checkAuth"+error)
         set({authUser:null})}
    finally{
        set({isCheckedAuth:false})   //this is used to prevent infinite loop
      }
    },
signup:async(data)=>
{ set({isSigningUp:true})
try{
const res =await axiosInstance.post("/auth/signup",data)
set({authUser :res.data})
toast.success("Account Created Successfully")
get().connectSocket();
 window.location.href = "/login";

}
catch(error)
{
toast.error(error.response?.data?.message || "Signup failed")
}
finally{
    set({isSigningUp:false})
}

},
logout:async()=>
{
    try{
         await axiosInstance.post("/auth/logout")
         set({authUser:null})
         toast.success("Logged Out Successfully")
         get().disconnectSocket();    
    }
    catch(error)
    {
toast.error(error.response.data.message);
    }

},
login:async(data)=>
{
    set({isLoggingIn:true})
    try{
   const res =await axiosInstance.post("/auth/login",data)
   set({authUser:res.data});
 toast.success("Account Logged in Successfully")
 get().connectSocket();
 window.location.href = "/";
  
}
    catch(error)
    {
        toast.error(error.response?.data?.message || "Login failed")
    }
finally{
    set({isLoggingIn:false})
    }   
},
updateProfile:async(data)=>
{   set({isUpdatingProfile:true});
    try{
  const res= await axiosInstance.put("/auth/update-profile",data)
  set({authUser:res.data});
  toast.success("Profile updated Successfully")
    }
    catch(error)
    {
    toast.error(error.response.data.message)
    }
    finally{
        set({isUpdatingProfile:false})
    }
},
connectSocket:()=>
{
const {authUser,BASE_URL}=get();
if(!authUser || get().socket?.connected) return;
const newSocket =io(BASE_URL,{withCredentials:true,query:{
    userId:authUser._id,
},})
set({socket:newSocket});            //this socket will use in the disconnect state earlier socket state was null now it the sae as the connected          

newSocket.on("getOnlineUsers",(userIds)=>
{
set({ onlineUsers:userIds});
})
}, 
disconnectSocket:()=>
{
if(get().socket?.connected) 
    get().socket.disconnect();
}

}))
