import React, { useEffect, useState } from 'react'
import { Paperclip } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import {useNavigate} from 'react-router-dom'


const Edit = () => {
  const [Formcaption, setFormcaption] = useState('')
  const navigate = useNavigate()


  const editformsubmit = (e)=>{
    e.preventDefault()
    setFormcaption('')
  }
  return (
    <div className='flex flex-col justify-center items-center mt-30 sm:mt-15 pt-20'>
      <button onClick={()=> navigate(-1)} className='self-start mb-4 flex gap-1 active:scale-95 hover:bg-green-600 cursor-pointer items-center border-0 outline-0 py-2 px-3 bg-green-500 rounded-xl text-white mr-3'>
        <ArrowBigLeft />
        <p>Back</p>
      </button>
      <div className='sm:w-1/2 w-full rounded-3xl relative flex flex-col gap-3 p-3 h-100 bg-gray-50'>
        <div className='w-full flex justify-between gap-3 h-1/4 px-1 items-center'>
          <div className='flex gap-3 items-center'>
            <img className='w-8 aspect-square object-cover rounded-full' src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" />
            <div className='text-sm text-gray-500'>
              <p className='text-black font-semibold leading-4'>Aryan Kashyap</p>
              <p><span className='font-semibold'>@</span>aryankp_17</p>
            </div>
          </div>
          <div>
            <button className='py-2 px-5 bg-red-700 text-white active:scale-95 hover:scale-105 cursor-pointer rounded-3xl font-medium'>Delete</button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <img className='w-full h-40 cursor-pointer opacity-80 object-cover' src="https://images.unsplash.com/photo-1761839257789-20147513121a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          {/* <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p> */}

        </div>
        <div className='flex flex-col gap-2'>
          <div>
            <form onSubmit={(e)=> editformsubmit(e)}>
              <textarea autoFocus value={Formcaption} onChange={(e)=> setFormcaption(e.target.value)} placeholder='Edit your caption...' className='w-full placeholder:text-sm text-sm font-medium outline-0 h-25 min-h-10 max-h-30 p-2 bg-gray-200 rounded-xl'></textarea>
              <div className='flex text-sm text-gray-500 p-1 items-center justify-end gap-1'>
                <label title="Edit Image" className='cursor-pointer active:scale-95 flex gap-1 items-center'>
                <Paperclip />
                <input type="file" className='hidden' />
              </label>
              <button className='py-2 px-5 bg-yellow-400 text-black active:scale-95 hover:scale-105 cursor-pointer rounded-3xl font-medium'>Update</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Edit