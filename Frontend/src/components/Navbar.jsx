import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { LogOut, LucideClockArrowDown, MessageSquare, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
const Navbar = () => {

      const {authUser,logout}=useAuthStore();
  return (
    <header
    className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
    backdrop-blur-lg bg-base-100/80  bg-indigo-950 ' 
    >
      <div className=" mx-auto px-4 h-16  bg-indigo-950 ">
<div className='flex items-center justify-between h-full'>
  <div className='flex items-center gap-8'>
    <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
    <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center">
      <MessageSquare className='w-5 h-5 text-sky-300'/>
      </div>  
<h1 className='text-lg font-bold  text-sky-300'>Chatty </h1>
</Link>
    </div> 
<div className='flex items-center gap-2  bg-indigo-950'>
  <Link
  to={"/settings"}
  className={
    `btn btn-sm gap-2 transition-colors  bg-indigo-950`
  }>
    <Settings className='w-4 h-4  text-sky-300'/>
    <span className='hidden sm:inline  bg-indigo-950 text-sky-300'>Settings</span>
  </Link>
  {authUser && (
<>
<Link to={"/profile"} className={`btn btn-sm gap-2 transition-colors  bg-indigo-950`} >
<User className='size-5  text-sky-300'/>
 <span className='hidden sm:inline  bg-indigo-950 text-sky-300'>Profile</span>
</Link>
<button className='flex gap-2 items-center btn btn-sm transition-colors  bg-indigo-950' onClick={logout}>
  <LogOut className='size-5  text-sky-300  bg-indigo-950'/>
  <span className='hidden sm:inline  bg-indigo-950 text-sky-300'>Logout</span>
</button>
</>
    )
  }
  </div>
</div>
      </div>
    </header>
      
    
  )
}

export default Navbar
