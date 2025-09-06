import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg,setSelectedImg]=useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];      //grab the photo 
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);            //url of photo
    reader.onload=async()=>{
const base64Image=reader.result;
setSelectedImg(base64Image);
await updateProfile({profilePic:base64Image})
    }
  
  };

  return (
    <div className="min-h-screen pt-20 bg-indigo-950 text-sky-300 ">
      <div className="max-w-2xl mx-auto p-4 py-8 border rounded-lg">
        <div className="bg-indigo-950 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <img
                src={selectedImg|| authUser.profilePic || '/assets/avatar.png'}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full border-4 border-sky-300 shadow-md"
              />

              {/* Camera icon inside the relative container */}
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 bg-indigo-800 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                }`}
              >
                <Camera className="w-5 h-5 text-sky-300" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-sky-300 text-center">
              {isUpdatingProfile
                ? 'Uploading...'
                : 'Click the camera icon to upload your photo'}
            </p>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-sky-300 flex items-center gap-2'>
                <User className='w-4 h-4  text-sky-300 '/>
                Full Name
                </div>
                <p className='px-4 py-2.5 bg-indigo-950 rounded-lg border border-sky-300 '>{authUser?.name}</p>
              </div>

               <div className='space-y-1.5'>
              <div className='text-sm text-sky-300 flex items-center gap-2'>
                <Mail className='w-4 h-4  text-sky-300 '/>
                Email
                </div>
                <p className='px-4 py-2.5 bg-indigo-950 rounded-lg border border-sky-300 '>{authUser?.email}</p>
              </div>
              </div>
             <div className='mt-6  rounded-xl p-6  bg-indigo-950 border border-sky-300 border-b-4'>
  <h2 className='text-lg font-medium mb-4 text-sky-300 bg-indigo-950'>Account Information</h2>
  <div className='space-y-1.5 text-sm'>
    <div className="flex items-center justify-between py-2 border-b border-sky-300 bg-indigo-950">
      <span>Member Since</span>
      <span>{authUser.createdAt?.split("T")[0]}</span>
    </div>
    <div className="flex items-center justify-between py-2">
      <span>Account Status</span>
      <span className='text-green-500'>Active</span>
    </div>
  </div>
      </div>
      </div>
      </div>
  </div>
  
  )
};

export default ProfilePage;
