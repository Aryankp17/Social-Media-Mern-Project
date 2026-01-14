import React, { useEffect, useState } from 'react'
import { UserRoundPen } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { profileupdate } from '../redux/UserAuthSlice';

const Profile = () => {
  const navigate = useNavigate();
  const {user,message,error,loading} =  useSelector((state)=> state.UserAuth);
  const dispatch = useDispatch()
  const [form, setform] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    username: user?.username || "",
    title: user?.title || "",
    image: user?.profilepic ||  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
  });


  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', form.name);
    formdata.append('email', form.email);
    if (typeof form.password === "string" && form.password.trim().length > 0) {
      formdata.append("password", form.password);
    }
    formdata.append('username', form.username);
    formdata.append('title', form.title);
    if (form.image instanceof File) {
      formdata.append('image', form.image);
    }
    try {
      dispatch(profileupdate(formdata))
      toast.success(message || "Profile updated successfully")
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error in updating profile')
      
    }
  }
  return (
    <div className='sm:px-20 px-3 py-5 sm:mt-5 sm:py-20 pt-30 w-full bg-slate-100 h-full'>
      <button onClick={() => navigate(-1)} className='self-start mb-4 flex gap-1 active:scale-95 hover:bg-green-600 cursor-pointer items-center border-0 outline-0 py-2 px-3 bg-green-500 rounded-xl text-white mr-3'>
        <ArrowBigLeft />
        <p>Back</p>
      </button>
      <div>
        <h1 className='text-3xl px-5 sm:px-20 font-bold'>Your Account</h1>
        <div className=' px-10 py-5 w-full mx-auto sm:w-1/2 mt-5 rounded-lg'>
          <div className='relative w-fit mx-auto'>
            <img className='w-40 object-cover cursor-pointer aspect-square rounded-full' src={form.image} alt="" />
            <label>
              <UserRoundPen className=' absolute bottom-2 active:scale-95 right-2 cursor-pointer hover:text-blue-500' />
              <input onChange={(e) => setform({ ...form, image: e.target.files[0] })} type="file" className='hidden' />
            </label>
          </div>
          <form onSubmit={(e) => handlesubmit(e)} className='mt-5 py-5 flex flex-col gap-3'>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Name</label>
              <input value={form.name} onChange={(e) => setform({ ...form, name: e.target.value })} className='p-3 border border-gray-500 rounded-lg outline-0' type="name" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Email</label>
              <input value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} className='p-3 border border-gray-500 rounded-lg outline-0' type="email" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Password</label>
              <input value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })} className='p-3 border border-gray-500 rounded-lg outline-0' type="password" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Username</label>
              <input value={form.username} onChange={(e) => setform({ ...form, username: e.target.value })} className='p-3 border border-gray-500 rounded-lg outline-0' type="text" />
            </div>

            <div className='flex flex-col  gap-2 py-1 px-2'>
              <label className='font-medium'>Title</label>
              <input value={form.title} onChange={(e) => setform({ ...form, title: e.target.value })} className='p-3 border border-gray-500 rounded-lg outline-0' type="text" />
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