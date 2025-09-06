import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()    //using this state to check if user is logged in or not 
  
  console.log({onlineUsers});

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser)
  if(isCheckingAuth&&!authUser)
    return (
  <div className='flex items-center justify-center h-screen'>
    <Loader className="size-10 animate-spin"/>
  </div>
  )

  return (
   
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}></Route>   
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}></Route>
        <Route path="/settings" element={<SettingsPage/>}></Route>
        <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}></Route>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App
