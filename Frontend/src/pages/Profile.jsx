import React from 'react'
import { UserRoundPen } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className='sm:px-20 px-3 py-5 sm:mt-5 sm:py-20 pt-30 w-full bg-slate-100 h-full'>
      <button onClick={()=> navigate(-1)} className='self-start mb-4 flex gap-1 active:scale-95 hover:bg-green-600 cursor-pointer items-center border-0 outline-0 py-2 px-3 bg-green-500 rounded-xl text-white mr-3'>
        <ArrowBigLeft />
        <p>Back</p>
      </button>
      <div>
        <h1 className='text-3xl px-5 sm:px-20 font-bold'>Your Account</h1>
        <div className=' px-10 py-5 w-full mx-auto sm:w-1/2 mt-5 rounded-lg'>
          <div className='relative w-fit mx-auto'>
            <img className='w-40 object-cover cursor-pointer aspect-square rounded-full' src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" />
           <label>
             <UserRoundPen className=' absolute bottom-2 active:scale-95 right-2 cursor-pointer hover:text-blue-500' />
             <input type="file" className='hidden' />
           </label>
          </div>
          <form className='mt-5 py-5 flex flex-col gap-3'>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Name</label>
              <input className='p-3 border border-gray-500 rounded-lg outline-0' type="name" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Email</label>
              <input className='p-3 border border-gray-500 rounded-lg outline-0' type="email" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Password</label>
              <input className='p-3 border border-gray-500 rounded-lg outline-0' type="password" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Username</label>
              <input className='p-3 border border-gray-500 rounded-lg outline-0' type="text" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Title</label>
              <input className='p-3 border border-gray-500 rounded-lg outline-0' type="text" />
            </div>
            <div className='flex flex-col gap-2 py-1 px-2'>
              <button className='p-2 cursor-pointer bg-blue-500 active:scale-95 text-white rounded-lg' type="submit">Save</button>
            </div>

          </form>
        </div>

      </div>

    </div>
  )
}

export default Profile